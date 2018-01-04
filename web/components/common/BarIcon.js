import React, { Component, PropTypes } from 'react';
import Dimensions from 'react-dimensions';
import { scaleLinear } from 'd3-scale';

class BarIcon extends Component {
    constructor(props) {
        super(props);
        this.handleSize = this.handleSize.bind(this);
        this.scale = scaleLinear()
            .domain(props.domain);
        this.handleSize(props);
    }

    componentWillReceiveProps(newProps) {
        const isSizeChanged = (this.props.containerWidth !== newProps.containerWidth);
        if (isSizeChanged) {
            this.handleSize(newProps);
        }
    }

    handleSize(props) {
        const { containerWidth } = props;
        this.height = containerWidth * 1.1;
        this.margin = this.height / 9;
        this.yCenter = this.height / 2;
        this.xCenter = containerWidth / 2;
        this.maxDiviation = Math.abs(this.height / 2 - this.margin);
        this.scale.range([-this.maxDiviation, this.maxDiviation]);
    }

    render() {
        const { containerWidth, value } = this.props;
        const { height, yCenter, xCenter, margin, scale } = this;
        const offsetX = margin - 5;
        const yStep = yCenter / 4;
        return (
            <div className={`device-bar-icon ${this.props.className}`}>
                <svg height={height}>
                    <g>
                        <line
                            x1={margin}
                            y1={0}
                            x2={containerWidth - margin}
                            y2={0}
                        />
                        <line
                            x1={margin}
                            y1={yCenter - 3 * yStep}
                            x2={containerWidth - margin}
                            y2={yCenter - 3 * yStep}
                        />
                        <line
                            x1={margin}
                            y1={yCenter - 2 * yStep}
                            x2={containerWidth - margin}
                            y2={yCenter - 2 * yStep}
                        />
                        <line
                            x1={margin}
                            y1={yCenter - yStep}
                            x2={containerWidth - margin}
                            y2={yCenter - yStep}
                        />
                        <line
                            x1={offsetX}
                            y1={yCenter}
                            x2={containerWidth - offsetX}
                            y2={yCenter}
                        />
                        <line
                            x1={margin}
                            y1={yCenter + yStep}
                            x2={containerWidth - margin}
                            y2={yCenter + yStep}
                        />
                        <line
                            x1={margin}
                            y1={yCenter + 2 * yStep}
                            x2={containerWidth - margin}
                            y2={yCenter + 2 * yStep}
                        />
                        <line
                            x1={margin}
                            y1={yCenter + 3 * yStep}
                            x2={containerWidth - margin}
                            y2={yCenter + 3 * yStep}
                        />
                        <line
                            x1={margin}
                            y1={height}
                            x2={containerWidth - margin}
                            y2={height}
                        />
                    </g>
                    <g>
                        <line
                            style={{
                                strokeWidth: containerWidth - 2 * margin,
                            }}
                            className="metric-cursor"
                            x1={xCenter}
                            y1={yCenter}
                            x2={xCenter}
                            y2={yCenter - scale(value)}
                        />
                    </g>
                </svg>
            </div>
        );
    }
}

BarIcon.propTypes = {
    value: PropTypes.number,
    domain: PropTypes.arrayOf(PropTypes.number),
    className: PropTypes.string,
    containerWidth: PropTypes.number,
};

export default Dimensions()(BarIcon);
