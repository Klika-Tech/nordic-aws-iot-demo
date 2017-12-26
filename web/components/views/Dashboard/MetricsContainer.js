import React, { PropTypes } from 'react';
import { Grid, Row, Col, PanelContainer, Panel, PanelBody, PanelHeader, Icon } from '@sketchpixy/rubix';

const MetricsContainer = ({ children, title, glyph }) => (
    <PanelContainer className="nordic-metric-container">
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
                                <div className="tile-content">
                                    {children}
                                </div>
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
};

export default MetricsContainer;
