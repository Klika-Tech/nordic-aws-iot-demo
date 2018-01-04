import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col, PanelContainer, Panel, PanelBody, PanelHeader, Icon } from '@sketchpixy/rubix';

const MetricsContainer = ({ children, title, glyph, href }) => (
    <PanelContainer className="device-metric-container">
        <Panel>
            <PanelBody>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <div className="tile-header">
                                <Icon className="tile-icon" bundle="fontello" glyph={glyph} />
                                <span className="tile-title">{title}</span>
                            </div>
                            <div className="tile-body">
                                {!!href &&
                                <Link to={href} className="tile-content">{children}</Link>
                                }
                                {!href &&
                                <div className="tile-content">{children}</div>
                                }
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </PanelBody>
        </Panel>
    </PanelContainer>
);

MetricsContainer.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    glyph: PropTypes.string,
    href: PropTypes.string,
};

export default MetricsContainer;
