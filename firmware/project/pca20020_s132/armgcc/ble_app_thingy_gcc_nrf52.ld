/* Linker script to configure memory regions. */

SEARCH_DIR(.)
GROUP(-lgcc -lc -lnosys)

/* BLE app soft 
MEMORY
{
  FLASH (rx) : ORIGIN = 0x1F000, LENGTH = 0x59000
  RAM (rwx) :  ORIGIN = 0x20004068, LENGTH = 0xBF98
}
*/
/* IoT soft */
MEMORY
{
  FLASH (rx) : ORIGIN = 0x1f000, LENGTH = 0x61000
  RAM (rwx) :  ORIGIN = 0x20002800, LENGTH = 0xd800
}

SECTIONS
{
  .fs_data :
  {
    PROVIDE(__start_fs_data = .);
    KEEP(*(.fs_data))
    PROVIDE(__stop_fs_data = .);
  } > RAM
} INSERT AFTER .data;

INCLUDE "nrf5x_common.ld"
