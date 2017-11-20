/*
 * Copyright (c) Nordic Semiconductor ASA
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 *   1. Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright notice, this
 *   list of conditions and the following disclaimer in the documentation and/or
 *   other materials provided with the distribution.
 *
 *   3. Neither the name of Nordic Semiconductor ASA nor the names of other
 *   contributors to this software may be used to endorse or promote products
 *   derived from this software without specific prior written permission.
 *
 *   4. This software must only be used in a processor manufactured by Nordic
 *   Semiconductor ASA, or in a processor manufactured by a third party that
 *   is used in combination with a processor manufactured by Nordic Semiconductor.
 *
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
/**
 * @defgroup nrf_nvic_api SoftDevice NVIC API
 * @{
 *
 * @note In order to use this module, the following code has to be added to a .c file:
 *     \code
 *     nrf_nvic_state_t nrf_nvic_state = {0};
 *     \endcode
 *
 * @note Definitions and declarations starting with __ (double underscore) in this header file are
 * not intended for direct use by the application.
 *
 * @brief APIs for the accessing NVIC when using a SoftDevice.
 *
 */

#ifndef NRF_NVIC_H__
#define NRF_NVIC_H__

#include <stdint.h>
#include "nrf.h"

#include "nrf_error_soc.h"

#ifdef __cplusplus
extern "C" {
#endif

/**@addtogroup NRF_NVIC_DEFINES Defines
 * @{ */

/**@defgroup NRF_NVIC_ISER_DEFINES SoftDevice NVIC internal definitions
 * @{ */

#define __NRF_NVIC_NVMC_IRQn (30) /**< The peripheral ID of the NVMC. IRQ numbers are used to identify peripherals, but the NVMC doesn't have an IRQ number in the MDK. */

//#ifdef NRF51
//  #define __NRF_NVIC_ISER_COUNT (1) /**< The number of ISER/ICER registers in the NVIC that are used. */
//
//  /**@brief Interrupts used by the SoftDevice. */
//  #define __NRF_NVIC_SD_IRQS_0 ((uint32_t)( \
//        (1U << POWER_CLOCK_IRQn) \
//      | (1U << RADIO_IRQn) \
//      | (1U << RTC0_IRQn) \
//      | (1U << TIMER0_IRQn) \
//      | (1U << RNG_IRQn) \
//      | (1U << ECB_IRQn) \
//      | (1U << CCM_AAR_IRQn) \
//      | (1U << TEMP_IRQn) \
//      | (1U << __NRF_NVIC_NVMC_IRQn) \
//      | (1U << (uint32_t)SWI4_IRQn) \
//      | (1U << (uint32_t)SWI5_IRQn) \
//    ))
//
//  /**@brief Interrupts available for to application. */
//  #define __NRF_NVIC_APP_IRQS_0 (~__NRF_NVIC_SD_IRQS_0)
//#endif
//
#ifdef NRF52
  #define __NRF_NVIC_ISER_COUNT (2) /**< The number of ISER/ICER registers in the NVIC that are used. */

  /**@brief Interrupts used by the SoftDevice. */
  #define __NRF_NVIC_SD_IRQS_0 ((uint32_t)( \
        (1U << POWER_CLOCK_IRQn) \
      | (1U << RADIO_IRQn) \
      | (1U << RTC0_IRQn) \
      | (1U << TIMER0_IRQn) \
      | (1U << RNG_IRQn) \
      | (1U << ECB_IRQn) \
      | (1U << CCM_AAR_IRQn) \
      | (1U << TEMP_IRQn) \
      | (1U << __NRF_NVIC_NVMC_IRQn) \
      | (1U << (uint32_t)SWI4_EGU4_IRQn) \
      | (1U << (uint32_t)SWI5_EGU5_IRQn) \
    ))
  #define __NRF_NVIC_SD_IRQS_1 ((uint32_t)0)

  /**@brief Interrupts available for to application. */
  #define __NRF_NVIC_APP_IRQS_0 (~__NRF_NVIC_SD_IRQS_0)
  #define __NRF_NVIC_APP_IRQS_1 (~__NRF_NVIC_SD_IRQS_1)
#endif
/**@} */

/**@} */

/**@addtogroup NRF_NVIC_VARIABLES Variables
 * @{ */

/**@brief Type representing the state struct for the SoftDevice NVIC module. */
typedef struct
{
  uint32_t volatile __irq_masks[__NRF_NVIC_ISER_COUNT]; /**< IRQs enabled by the application in the NVIC. */
  uint32_t volatile __cr_flag;                          /**< Non-zero if already in a critical region */
} nrf_nvic_state_t;

/**@brief Variable keeping the state for the SoftDevice NVIC module. This must be declared in an
 * application source file. */
extern nrf_nvic_state_t nrf_nvic_state;

#ifdef __cplusplus
}
#endif

#endif // NRF_NVIC_H__

/**@} */
