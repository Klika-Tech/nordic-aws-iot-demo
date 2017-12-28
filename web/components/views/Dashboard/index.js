import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import moment from 'moment';
import isNumber from 'lodash/isNumber';
import { Grid, Row, Col, Icon } from '@sketchpixy/rubix';
import { CELSIUS, PERCENTS, HYPER_PASCALS, PPM, PPB, DEGREES, G, FAHRENHEITS, TESLAS } from '../../../scaleUnits';
import { UNDEFINED_STR_VAL, Direction, Orientation } from '../../../thingy52Const';
import './style.scss';
import MetricsContainer from './MetricsContainer';

function cToF(celsius) {
    if (celsius === null || celsius === undefined) return null;
    return celsius * 9 / 5 + 32;
}

function formattedValue(val, scaleUnit, round) {
    let strVal = '?';
    if (isNumber(val)) {
        strVal = `${round ? Math.round(val) : val.toFixed(2)}`;
    }
    return (<span className="tile-value">
        <span className="formatted-value">{strVal}</span>
        { scaleUnit &&
        <span className="unit">{` ${scaleUnit.label}`}</span>
        }
    </span>);
}

function formattedShadowValue(shadow, key, scaleUnit, round) {
    const val = get(shadow, key);
    return formattedValue(val, scaleUnit, round);
}

function formattedRGB(shadow, key) {
    const val = get(shadow, key);
    return !val ? 'rgb(0,0,0)' : `rgb(${val.red},${val.green},${val.blue})`;
}

function formatDate(shadow, key) {
    const date = get(shadow, key);
    return date ? moment(date).fromNow() : 'more then 2h ago';
}

const mapStateToProps = state => ({
    shadow: state.data.shadow,
});

const Dashboard = ({ shadow }) => (
    <Grid className="dashboard">
        <Row>
            <Col xs={6} sm={4} md={2}>
                <MetricsContainer title="Temperature" glyph="temperatire" href="/temperature">
                    <div className="tile-center">
                        <div className="tile-big-val">{formattedShadowValue(shadow, 'temperature', CELSIUS)}</div>
                        <div>{formattedValue(cToF(get(shadow, 'temperature')), FAHRENHEITS)}</div>
                    </div>
                </MetricsContainer>
            </Col>
            <Col xs={6} sm={4} md={2}>
                <MetricsContainer title="Humidity" glyph="water" href="/humidity">
                    <div className="tile-big-val tile-center">{formattedShadowValue(shadow, 'humidity', PERCENTS)}</div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={4} md={2}>
                <MetricsContainer title="Barometer" glyph="gauge" href="/barometer">
                    <div className="tile-big-val tile-center">
                        {formattedShadowValue(shadow, 'pressure', HYPER_PASCALS)}
                    </div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={4} md={2}>
                <MetricsContainer title="CO2" glyph="pagelines" href="/eco2">
                    <div className="tile-big-val tile-center">{formattedShadowValue(shadow, 'eco2', PPM, true)}</div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={4} md={2}>
                <MetricsContainer title="TVOC" glyph="beaker" href="/tvoc">
                    <div className="tile-big-val tile-center">{formattedShadowValue(shadow, 'tvoc', PPB, true)}</div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={4} md={2}>
                <MetricsContainer title="Color" glyph="eyedropper">
                    <div className="tile-center color-circle" style={{ color: formattedRGB(shadow, 'color') }}>
                        <Icon className="tile-icon" bundle="fontello" glyph="circle" />
                    </div>
                </MetricsContainer>
            </Col>
            <Col xs={6} sm={4} md={2}>
                <MetricsContainer title="Accelerometer" glyph="chart-line" href="/accelerometer">
                    <div className="tile-center">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>{formattedShadowValue(shadow, 'accelerometer.0', G)}</td>
                                    <td>{formattedShadowValue(shadow, 'accelerometer.1', G)}</td>
                                    <td>{formattedShadowValue(shadow, 'accelerometer.2', G)}</td>
                                </tr>
                                <tr>
                                    <td className="color-axis-x">X</td>
                                    <td className="color-axis-y">Y</td>
                                    <td className="color-axis-z">Z</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </MetricsContainer>
            </Col>


            <Col xs={6} sm={4} md={2}>
                <MetricsContainer title="Gyroscope" glyph="globe-alt" href="/gyroscope">
                    <div className="tile-center">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>{formattedShadowValue(shadow, 'gyroscope.0', DEGREES)}</td>
                                    <td>{formattedShadowValue(shadow, 'gyroscope.1', DEGREES)}</td>
                                    <td>{formattedShadowValue(shadow, 'gyroscope.2', DEGREES)}</td>
                                </tr>
                                <tr>
                                    <td className="color-axis-x">X</td>
                                    <td className="color-axis-y">Y</td>
                                    <td className="color-axis-z">Z</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={4} md={2}>
                <MetricsContainer title="Compass" glyph="compass" href="/compass">
                    <div className="tile-center">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>{formattedShadowValue(shadow, 'compass.0', TESLAS)}</td>
                                    <td>{formattedShadowValue(shadow, 'compass.1', TESLAS)}</td>
                                    <td>{formattedShadowValue(shadow, 'compass.2', TESLAS)}</td>
                                </tr>
                                <tr>
                                    <td className="color-axis-x">X</td>
                                    <td className="color-axis-y">Y</td>
                                    <td className="color-axis-z">Z</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={4} md={2}>
                <MetricsContainer title="Gravity" glyph="magnet-1" href="/gravity">
                    <div className="tile-center">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>{formattedShadowValue(shadow, 'gravity.0')}</td>
                                    <td>{formattedShadowValue(shadow, 'gravity.1')}</td>
                                    <td>{formattedShadowValue(shadow, 'gravity.2')}</td>
                                </tr>
                                <tr>
                                    <td className="color-axis-x">X</td>
                                    <td className="color-axis-y">Y</td>
                                    <td className="color-axis-z">Z</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={4} md={2}>
                <MetricsContainer title="Euler" glyph="ccw">
                    <div className="tile-center">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>{formattedShadowValue(shadow, 'euler.roll', null, true)}</td>
                                    <td>{formattedShadowValue(shadow, 'euler.pitch', null, true)}</td>
                                    <td>{formattedShadowValue(shadow, 'euler.yaw', null, true)}</td>
                                </tr>
                                <tr>
                                    <td className="color-axis-x">Roll</td>
                                    <td className="color-axis-y">Pitch</td>
                                    <td className="color-axis-z">Yaw</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={4} md={2}>
                <MetricsContainer title="Quaternion" glyph="cw">
                    <div className="tile-center">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>{formattedShadowValue(shadow, 'quaternion.x')}</td>
                                    <td>{formattedShadowValue(shadow, 'quaternion.y')}</td>
                                    <td>{formattedShadowValue(shadow, 'quaternion.z')}</td>
                                    <td>{formattedShadowValue(shadow, 'quaternion.w')}</td>
                                </tr>
                                <tr>
                                    <td className="color-axis-x">X</td>
                                    <td className="color-axis-y">Y</td>
                                    <td className="color-axis-z">Z</td>
                                    <td>W</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </MetricsContainer>
            </Col>


            <Col xs={6} sm={4} md={2}>
                <MetricsContainer title="Step Counter" glyph="heart">
                    <div className="tile-center">
                        <div className="tile-big-val">
                            {formattedShadowValue(shadow, 'stepCounter.steps', null, true)}
                        </div>
                        <div>Time: {formattedShadowValue(shadow, 'stepCounter.time', null, true)} ms</div>
                    </div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={4} md={2}>
                <MetricsContainer title="Tap" glyph="down-hand">
                    <div className="tile-center">
                        <div className="tile-big-val">{Direction[get(shadow, 'tap.direction', 0)]}</div>
                        {!!get(shadow, 'tap.direction') &&
                        <div>Count: {formattedShadowValue(shadow, 'tap.count', null, true)}</div>
                        }
                    </div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={4} md={2}>
                <MetricsContainer title="Orientation" glyph="anchor">
                    <div className="tile-big-val tile-center">
                        {get(Orientation, get(shadow, 'orientation'), UNDEFINED_STR_VAL)}
                    </div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={4} md={2}>
                <MetricsContainer title="Heading" glyph="direction" href="heading">
                    <div className="tile-big-val tile-center">{formattedShadowValue(shadow, 'heading', DEGREES)}</div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={4} md={2}>
                <MetricsContainer title="Battery" glyph="battery" href="/battery">
                    <div className="tile-big-val tile-center">
                        {formattedShadowValue(shadow, 'batteryLevel', PERCENTS, true)}
                    </div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={4} md={2}>
                <MetricsContainer title="Button last pushed" glyph="blank">
                    <div className="tile-big-val tile-center">{formatDate(shadow, 'marked')}</div>
                </MetricsContainer>
            </Col>
        </Row>
    </Grid>
);

export default connect(mapStateToProps)(Dashboard);
