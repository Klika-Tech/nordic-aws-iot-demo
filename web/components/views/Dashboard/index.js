import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import moment from 'moment';
import isNumber from 'lodash/isNumber';
import { Grid, Row, Col, Icon } from '@sketchpixy/rubix';
import { CELSIUS, PERCENTS, HYPER_PASCALS, PPM, PPB } from '../../../scaleUnits';
import { UNDEFINED_STR_VAL, Direction, Orientation } from '../../../thingy52Const';
import './style.scss';
import MetricsContainer from './MetricsContainer';

function formattedValue(shadow, key, scaleUnit, round) {
    const val = get(shadow, key);
    let strVal = '?';
    if (isNumber(val)) {
        strVal = `${round ? Math.round(val) : val.toFixed(2)}`;
    }
    return scaleUnit ? `${strVal} ${scaleUnit.label}` : strVal;
}

function formattedRGB(shadow, key) {
    const val = get(shadow, key);
    return !val ? 'rgb(0,0,0)' : `rgb(${val.red},${val.green},${val.blue})`;
}

function formatDate(shadow, key) {
    const date = get(shadow, key);
    return date ? moment(date).fromNow() : UNDEFINED_STR_VAL;
}

const mapStateToProps = state => ({
    shadow: state.data.shadow,
});

const Dashboard = ({ shadow }) => (
    <Grid className="dashboard">
        <Row>
            <Col xs={6} sm={3} md={2}>
                <MetricsContainer title="Temperature" glyph="temperatire">
                    <div className="tile-big-val tile-center">{formattedValue(shadow, 'temperature', CELSIUS)}</div>
                </MetricsContainer>
            </Col>
            <Col xs={6} sm={3} md={2}>
                <MetricsContainer title="Humidity" glyph="water">
                    <div className="tile-big-val tile-center">{formattedValue(shadow, 'humidity', PERCENTS)}</div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={3} md={2}>
                <MetricsContainer title="Pressure" glyph="gauge">
                    <div className="tile-big-val tile-center">{formattedValue(shadow, 'pressure', HYPER_PASCALS)}</div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={3} md={2}>
                <MetricsContainer title="CO2" glyph="pagelines">
                    <div className="tile-big-val tile-center">{formattedValue(shadow, 'eco2', PPM, true)}</div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={3} md={2}>
                <MetricsContainer title="TVOC" glyph="beaker">
                    <div className="tile-big-val tile-center">{formattedValue(shadow, 'tvoc', PPB, true)}</div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={3} md={2}>
                <MetricsContainer title="Color" glyph="eyedropper">
                    <div className="tile-center color-circle" style={{ color: formattedRGB(shadow, 'color') }}>
                        <Icon className="tile-icon" bundle="fontello" glyph="circle" />
                    </div>
                </MetricsContainer>
            </Col>
            <Col xs={6} sm={3} md={2}>
                <MetricsContainer title="Accelerometer" glyph="chart-line">
                    <div className="tile-center">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>X</th>
                                    <th>Y</th>
                                    <th>Z</th>
                                </tr>
                                <tr>
                                    <td>{formattedValue(shadow, 'accelerometer.0')}</td>
                                    <td>{formattedValue(shadow, 'accelerometer.1')}</td>
                                    <td>{formattedValue(shadow, 'accelerometer.2')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </MetricsContainer>
            </Col>


            <Col xs={6} sm={3} md={2}>
                <MetricsContainer title="Gyroscope" glyph="globe-alt">
                    <div className="tile-center">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>X</th>
                                    <th>Y</th>
                                    <th>Z</th>
                                </tr>
                                <tr>
                                    <td>{formattedValue(shadow, 'gyroscope.0')}</td>
                                    <td>{formattedValue(shadow, 'gyroscope.1')}</td>
                                    <td>{formattedValue(shadow, 'gyroscope.2')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={3} md={2}>
                <MetricsContainer title="Compass" glyph="compass">
                    <div className="tile-center">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>X</th>
                                    <th>Y</th>
                                    <th>Z</th>
                                </tr>
                                <tr>
                                    <td>{formattedValue(shadow, 'compass.0')}</td>
                                    <td>{formattedValue(shadow, 'compass.1')}</td>
                                    <td>{formattedValue(shadow, 'compass.2')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={3} md={2}>
                <MetricsContainer title="Gravity" glyph="magnet-1">
                    <div className="tile-center">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>X</th>
                                    <th>Y</th>
                                    <th>Z</th>
                                </tr>
                                <tr>
                                    <td>{formattedValue(shadow, 'gravity.0')}</td>
                                    <td>{formattedValue(shadow, 'gravity.1')}</td>
                                    <td>{formattedValue(shadow, 'gravity.2')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={3} md={2}>
                <MetricsContainer title="Euler" glyph="ccw">
                    <div className="tile-center">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>Roll</th>
                                    <th>Pitch</th>
                                    <th>Yaw</th>
                                </tr>
                                <tr>
                                    <td>{formattedValue(shadow, 'euler.roll', null, true)}</td>
                                    <td>{formattedValue(shadow, 'euler.pitch', null, true)}</td>
                                    <td>{formattedValue(shadow, 'euler.yaw', null, true)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={3} md={2}>
                <MetricsContainer title="Quaternion" glyph="cw">
                    <div className="tile-center">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <th>X</th>
                                    <th>Y</th>
                                    <th>Z</th>
                                    <th>W</th>
                                </tr>
                                <tr>
                                    <td>{formattedValue(shadow, 'quaternion.x')}</td>
                                    <td>{formattedValue(shadow, 'quaternion.y')}</td>
                                    <td>{formattedValue(shadow, 'quaternion.z')}</td>
                                    <td>{formattedValue(shadow, 'quaternion.w')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </MetricsContainer>
            </Col>


            <Col xs={6} sm={3} md={2}>
                <MetricsContainer title="Step Counter" glyph="heart">
                    <div className="tile-center">
                        <div className="tile-big-val">
                            {formattedValue(shadow, 'stepCounter.steps', null, true)}
                        </div>
                        <div>Time: {formattedValue(shadow, 'stepCounter.time', null, true)} sec</div>
                    </div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={3} md={2}>
                <MetricsContainer title="Tap" glyph="down-hand">
                    <div className="tile-center">
                        <div className="tile-big-val">{Direction[get(shadow, 'tap.direction', 0)]}</div>
                        {!!get(shadow, 'tap.direction') &&
                        <div>Count: {formattedValue(shadow, 'tap.count', null, true)}</div>
                        }
                    </div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={3} md={2}>
                <MetricsContainer title="Orientation" glyph="anchor">
                    <div className="tile-big-val tile-center">
                        {get(Orientation, get(shadow, 'orientation'), UNDEFINED_STR_VAL)}
                    </div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={3} md={2}>
                <MetricsContainer title="Heading" glyph="direction">
                    <div className="tile-big-val tile-center">{formattedValue(shadow, 'heading')}</div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={3} md={2}>
                <MetricsContainer title="Battery" glyph="battery">
                    <div className="tile-big-val tile-center">
                        {formattedValue(shadow, 'batteryLevel', PERCENTS, true)}
                    </div>
                </MetricsContainer>
            </Col>

            <Col xs={6} sm={3} md={2}>
                <MetricsContainer title="Button last pushed" glyph="blank">
                    <div className="tile-big-val tile-center">{formatDate(shadow, 'marked')}</div>
                </MetricsContainer>
            </Col>
        </Row>
    </Grid>
);

export default connect(mapStateToProps)(Dashboard);
