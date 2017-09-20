/* Copyright (c) 2015 Nordic Semiconductor. All Rights Reserved.
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

#include "softdevice_handler_appsh.h"
#include "app_scheduler.h"
#include <string.h>

//#define SDH_DEBUG
#ifdef SDH_DEBUG
    #include "SEGGER_RTT.h"
    #define DEBUG_PRINTF (void)SEGGER_RTT_printf
#else
    #define DEBUG_PRINTF(...)
#endif


static uint32_t evt_scheduled = 0;

void softdevice_evt_get(void * p_event_data, uint16_t event_size)
{
    APP_ERROR_CHECK_BOOL(event_size == 0);
    
    while (evt_scheduled > 0)
    {
        uint32_t events = evt_scheduled;
        intern_softdevice_events_execute();
        evt_scheduled -= events;
    }
}

uint32_t softdevice_evt_schedule(void)
{   
    uint32_t err_code;
    
    if (evt_scheduled > 0)
    {
        //DEBUG_PRINTF(0, "softdevice_evt_schedule: evt_scheduled %d\r\n", evt_scheduled);
        err_code = NRF_SUCCESS;
    }
    else
    {
        err_code = app_sched_event_put(NULL, 0, softdevice_evt_get);
    }

    if (evt_scheduled < (UINT32_MAX-1))
    {
        evt_scheduled++;
    } 
    
    return err_code;
    //return app_sched_event_put(NULL, 0, softdevice_evt_get);
}
