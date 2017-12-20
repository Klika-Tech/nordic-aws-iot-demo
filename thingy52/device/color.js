const minIntensity = 2600;
const maxIntensity = 2650;

const led = {
    red: 120,
    green: 60,
    blue: 20,
};

function calibrate(color) {
    const rRatio = color.red / (color.red + color.green + color.blue);
    const gRatio = color.green / (color.red + color.green + color.blue);
    const bRatio = color.blue / (color.red + color.green + color.blue);

    const clearAtBlack = 300;
    const clearAtWhite = 400;
    const clearDiff = clearAtWhite - clearAtBlack;

    let clearNormalized = (color.clear - clearAtBlack) / clearDiff;
    if (clearNormalized < 0) {
        clearNormalized = 0;
    }

    let r8 = rRatio * 255.0 * 3 * clearNormalized;
    if (r8 > 255) {
        r8 = 255;
    }
    let g8 = gRatio * 255.0 * 3 * clearNormalized;
    if (g8 > 255) {
        g8 = 255;
    }
    let b8 = bRatio * 255.0 * 3 * clearNormalized;
    if (b8 > 255) {
        b8 = 255;
    }
    if (color.red < minIntensity) {
        led.red += 1;
        if (led.red > 255) {
            led.red = 255;
        }
    } else if (color.red > maxIntensity) {
        led.red -= 1;
        if (led.red < 0) {
            led.red = 0;
        }
    }

    if (color.green < minIntensity) {
        led.green += 1;
        if (led.green > 255) {
            led.green = 255;
        }
    } else if (color.green > maxIntensity) {
        led.green -= 1;
        if (led.green < 0) {
            led.green = 0;
        }
    }

    if (color.blue < minIntensity) {
        led.blue += 1;
        if (led.blue > 255) {
            led.blue = 255;
        }
    } else if (color.blue > maxIntensity) {
        led.blue -= 1;
        if (led.blue < 0) {
            led.blue = 0;
        }
    }
}

function getColor() {
    return led;
}

module.exports = {
    calibrate,
    getColor,
};
