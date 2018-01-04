import React, { Component, PropTypes } from 'react';
import Dimensions from 'react-dimensions';
import { scaleLinear } from 'd3-scale';

class AngleIcon extends Component {
    constructor(props) {
        super(props);
        this.handleSize = this.handleSize.bind(this);
        this.scale = scaleLinear()
            .domain(props.domain)
            .range([0, 360]);
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
        this.height = containerWidth * 0.9;
        this.margin = this.height / 10;
        this.cy = this.height / 2;
        this.cx = containerWidth / 2;
        this.r = Math.min(this.cx, this.cy) - this.margin;
    }

    render() {
        const { value } = this.props;
        const { height, cx, cy, r, scale } = this;
        return (
            <div className={`device-angle-icon ${this.props.className}`}>
                <svg height={height}>
                    <g>
                        <circle
                            cx={cx}
                            cy={cy}
                            r={r}
                        />
                        <line
                            x1={cx - r}
                            y1={cy}
                            x2={cx + r}
                            y2={cy}
                        />
                    </g>
                    <g>
                        <line
                            className="metric-cursor"
                            x1={cx - r}
                            y1={cy}
                            x2={cx + r}
                            y2={cy}
                            transform={`rotate(${scale(value)}, ${cx}, ${cy})`}
                        />
                    </g>
                </svg>
            </div>
        );
    }
}

AngleIcon.propTypes = {
    value: PropTypes.number,
    domain: PropTypes.arrayOf(PropTypes.number),
    className: PropTypes.string,
    containerWidth: PropTypes.number,
};

export default Dimensions()(AngleIcon);
