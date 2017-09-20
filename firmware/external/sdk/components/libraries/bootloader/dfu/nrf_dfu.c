/* Copyright (c) 2016 Nordic Semiconductor. All Rights Reserved.
 *
 * The information contained herein is property of Nordic Semiconductor ASA.
 * Terms and conditions of usage are described in detail in NORDIC
 * SEMICONDUCTOR STANDARD SOFTWARE LICENSE AGREEMENT.
 *
 * Licensees are granted free, non-transferable use of the information. NO
 * WARRANTY of ANY KIND is provided. This heading must NOT be removed from
 * the file.
 *
 */

#include "nrf_dfu.h"
#include "nrf_dfu_transport.h"
#include "nrf_dfu_utils.h"
#include "nrf_bootloader_app_start.h"
#include "nrf_dfu_settings.h"
#include "nrf_gpio.h"
#include "app_scheduler.h"
#include "app_timer_appsh.h"
#include "nrf_log.h"
//#include "boards.h"
#include "pca20020.h"
#include "nrf_bootloader_info.h"
#include "nrf_dfu_req_handler.h"

#include "nrf_delay.h"
#include "app_util_platform.h"
#include "drv_ext_gpio.h"

#define SCHED_MAX_EVENT_DATA_SIZE       MAX(APP_TIMER_SCHED_EVT_SIZE, 0)                        /**< Maximum size of scheduler events. */

#define SCHED_QUEUE_SIZE                20                                                      /**< Maximum number of events in the scheduler queue. */

#define APP_TIMER_PRESCALER             0                                                       /**< Value of the RTC1 PRESCALER register. */
#define APP_TIMER_OP_QUEUE_SIZE         4                                                       /**< Size of timer operation queues. */

static const nrf_drv_twi_t  m_twi_sensors = NRF_DRV_TWI_INSTANCE(TWI_SENSOR_INSTANCE);
static const drv_ext_light_conf_t led_config[DRV_EXT_LIGHT_NUM] = DRV_EXT_LIGHT_CFG;
    
static const nrf_drv_twi_config_t twi_config =
{
    .scl                = TWI_SCL,
    .sda                = TWI_SDA,
    .frequency          = NRF_TWI_FREQ_100K,
    .interrupt_priority = APP_IRQ_PRIORITY_LOW
};

static const drv_sx1509_cfg_t sx1509_cfg =
{
    .twi_addr       = SX1509_ADDR,
    .p_twi_instance = &m_twi_sensors,
    .p_twi_cfg      = &twi_config
};    

// Weak function implementation

/** @brief Weak implemenation of nrf_dfu_check_enter.
 *
 * @note    This function must be overridden to enable entering DFU mode at will.
 *          Default behaviour is to enter DFU when BOOTLOADER_BUTTON is pressed.
 */
__WEAK bool nrf_dfu_enter_check(void)
{
    if (NRF_POWER->RESETREAS == 0)
    {
        if (nrf_gpio_pin_read(BUTTON) == 0)
        {
            return true;
        }
    }

    if (s_dfu_settings.enter_buttonless_dfu == 1)
    {
        s_dfu_settings.enter_buttonless_dfu = 0;
        (void)nrf_dfu_settings_write(NULL);
        return true;
    }
    return false;
}


// Internal Functions

/**@brief Function for initialization of LEDs.
 */
static void leds_init(void)
{
    uint32_t                        err_code;
    static const drv_ext_light_init_t led_init = 
    {
        .p_light_conf        = led_config,
        .num_lights          = DRV_EXT_LIGHT_NUM,
        .clkx_div            = DRV_EXT_LIGHT_CLKX_DIV_8,
        .p_twi_conf          = &sx1509_cfg,
        .app_timer_prescaler = 0,
    };

    nrf_delay_ms(100);
    
    NRF_LOG_INFO("Before drv_ext_light_init\r\n");
    err_code = drv_ext_light_init(&led_init, true);
    NRF_LOG_INFO("After drv_ext_light_init\r\n");
    APP_ERROR_CHECK(err_code);
}

static void leds_on(void)
{
    static drv_ext_light_rgb_sequence_t sequence = 
    {
        .color         = DRV_EXT_LIGHT_COLOR_YELLOW,
        .sequence_vals = 
        {
            .on_time_ms       =  40,
            .on_intensity     =  60,
            .off_time_ms      =  85,
            .off_intensity    =  10,
            .fade_in_time_ms  = 250,
            .fade_out_time_ms = 450      
        }
    };
    
    (void)drv_ext_light_rgb_sequence(DRV_EXT_RGB_LED_LIGHTWELL, &sequence);
}

//static void leds_off(void)
//{
//    (void)drv_ext_light_off(DRV_EXT_RGB_LED_LIGHTWELL);  
//}

/**@brief Function for initializing the timer handler module (app_timer).
 */
static void timers_init(void)
{
    // Initialize timer module, making it use the scheduler.
    APP_TIMER_APPSH_INIT(APP_TIMER_PRESCALER, APP_TIMER_OP_QUEUE_SIZE, true);
}


/** @brief Function for event scheduler initialization.
 */
static void scheduler_init(void)
{
    APP_SCHED_INIT(SCHED_MAX_EVENT_DATA_SIZE, SCHED_QUEUE_SIZE);
}


static void wait_for_event()
{
    // Transport is waiting for event?
    while(true)
    {
        // Can't be emptied like this because of lack of static variables
        app_sched_execute();
    }
}


void nrf_dfu_wait()
{
    app_sched_execute();
}


uint32_t nrf_dfu_init()
{
    uint32_t ret_val = NRF_SUCCESS;
    uint32_t enter_bootloader_mode = 0;

    NRF_LOG_INFO("In real nrf_dfu_init\r\n");

    nrf_dfu_settings_init();

    // Continue ongoing DFU operations
    // Note that this part does not rely on SoftDevice interaction
    ret_val = nrf_dfu_continue(&enter_bootloader_mode);
    if(ret_val != NRF_SUCCESS)
    {
        NRF_LOG_INFO("Could not continue DFU operation: 0x%08x\r\n");
        enter_bootloader_mode = 1;
    }

    // Check if there is a reason to enter DFU mode
    // besides the effect of the continuation
    if (nrf_dfu_enter_check())
    {
        NRF_LOG_INFO("Application sent bootloader request\n");
        enter_bootloader_mode = 1;
    }

    if(enter_bootloader_mode != 0 || !nrf_dfu_app_is_valid())
    {
        timers_init();
        scheduler_init();
        leds_init();
        leds_on();
        
        // Initializing transports
        ret_val = nrf_dfu_transports_init();
        if (ret_val != NRF_SUCCESS)
        {
            NRF_LOG_INFO("Could not initalize DFU transport: 0x%08x\r\n");
            return ret_val;
        }

        (void)nrf_dfu_req_handler_init();

        // This function will never return
        NRF_LOG_INFO("Waiting for events\r\n");
        wait_for_event();
        NRF_LOG_INFO("After waiting for events\r\n");
    }

    if (nrf_dfu_app_is_valid())
    {
        NRF_LOG_INFO("Jumping to: 0x%08x\r\n", MAIN_APPLICATION_START_ADDR);
        nrf_bootloader_app_start(MAIN_APPLICATION_START_ADDR);
    }

    // Should not be reached!
    NRF_LOG_INFO("After real nrf_dfu_init\r\n");
    return NRF_SUCCESS;
}
