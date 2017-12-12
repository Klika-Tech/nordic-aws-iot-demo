import React from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, PanelContainer, Panel, PanelHeader, PanelBody } from '@sketchpixy/rubix';
import './style.scss';
import BarometerWidget from './BarometerWidget';
import HumidityWidget from './HumidityWidget';
import TemperatureWidget from './TemperatureWidget';
import ECO2Widget from './ECO2Widget';
import TVOCWidget from './TVOCWidget';
import BatteryLevelWidget from './BatteryLevelWidget';

const Dashboard = ({ data }) => (
    <Grid className="dashboard">
        <Row>
            <Col xs={12} sm={12} md={4}>
                <PanelContainer>
                    <Panel>
                        <PanelHeader className="bg-theme">
                            <Grid>
                                <Row>
                                    <Col xs={12} className="fg-white">
                                        <h4>ECO2</h4>
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelHeader>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs={12} className="chart-panel-body">
                                        <Link to="/eco2">
                                            <ECO2Widget />
                                        </Link>
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>
            </Col>
            <Col xs={12} sm={12} md={4}>
                <PanelContainer>
                    <Panel>
                        <PanelHeader className="bg-theme">
                            <Grid>
                                <Row>
                                    <Col xs={12} className="fg-white">
                                        <h4>TVOC</h4>
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelHeader>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs={12} className="chart-panel-body">
                                        <Link to="/tvoc">
                                            <TVOCWidget />
                                        </Link>
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>
            </Col>
            <Col xs={12} sm={12} md={4}>
                <PanelContainer>
                    <Panel>
                        <PanelHeader className="bg-theme">
                            <Grid>
                                <Row>
                                    <Col xs={12} className="fg-white">
                                        <h4>Battery Level</h4>
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelHeader>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs={12} className="chart-panel-body">
                                        <Link to="/battery">
                                            <BatteryLevelWidget />
                                        </Link>
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>
            </Col>
            <Col xs={12} sm={12} md={4}>
                <PanelContainer>
                    <Panel>
                        <PanelHeader className="bg-theme">
                            <Grid>
                                <Row>
                                    <Col xs={12} className="fg-white">
                                        <h4>Temperature</h4>
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelHeader>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs={12} className="chart-panel-body">
                                        <Link to="/temperature">
                                            <TemperatureWidget />
                                        </Link>
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>
            </Col>
            <Col xs={12} sm={12} md={4}>
                <PanelContainer>
                    <Panel>
                        <PanelHeader className="bg-theme">
                            <Grid>
                                <Row>
                                    <Col xs={12} className="fg-white">
                                        <h4>Humidity</h4>
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelHeader>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs={12} className="chart-panel-body">
                                        <Link to="/humidity">
                                            <HumidityWidget />
                                        </Link>
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>
            </Col>
            <Col xs={12} sm={6} md={4}>
                <PanelContainer>
                    <Panel>
                        <PanelHeader className="bg-theme">
                            <Grid>
                                <Row>
                                    <Col xs={12} className="fg-white">
                                        <h4>Barometer</h4>
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelHeader>
                        <PanelBody>
                            <Grid>
                                <Row>
                                    <Col xs={12} className="chart-panel-body">
                                        <Link to="/barometer">
                                            <BarometerWidget />
                                        </Link>
                                    </Col>
                                </Row>
                            </Grid>
                        </PanelBody>
                    </Panel>
                </PanelContainer>
            </Col>
        </Row>
    </Grid>
);


export default Dashboard;
