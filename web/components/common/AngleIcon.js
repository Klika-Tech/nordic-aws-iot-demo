import React, { Component, PropTypes } from 'react';
import Dimensions from 'react-dimensions';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';

class AngleIcon extends Component {
    constructor(props) {
        super(props);
        this.handleRef = this.handleRef.bind(this);
        this.handleResize = this.handleResize.bind(this);
        this.handleData = this.handleData.bind(this);
        this.scale = scaleLinear()
            .domain(props.domain)
            .range([0, 360]);
    }

    componentDidMount() {
        this.handleResize();
    }

    componentDidUpdate() {
        this.handleData();
    }

    handleData() {
        const { value } = this.props;
        this.cursor.attr('transform', `rotate(${this.scale(value)}, ${this.cx}, ${this.cy})`);
    }

    handleRef(el) {
        const { containerHeight, containerWidth } = this.props;
        this.svg = d3.select(el)
            .append('svg')
            .attr('width', containerWidth)
            .attr('height', containerHeight);

        this.bg = this.svg.append('g');
        this.circle = this.bg.append('circle');
        this.hr = this.bg.append('line');
        this.panel = this.svg.append('g');
        this.cursor = this.panel.append('line')
            .attr('class', 'metric-cursor');
    }

    handleResize() {
        this.margin = 10;
        const { containerHeight, containerWidth } = this.props;
        this.svg
            .attr('width', containerWidth)
            .attr('height', containerHeight);

        this.cy = containerHeight / 2;
        this.cx = containerWidth / 2;
        this.r = Math.min(this.cx, this.cy) - this.margin;

        this.circle
            .attr('cx', this.cx)
            .attr('cy', this.cy)
            .attr('r', this.r);

        this.hr
            .attr('x1', this.cx - this.r)
            .attr('y1', this.cy)
            .attr('x2', this.cx + this.r)
            .attr('y2', this.cy);

        this.cursor
            .attr('x1', this.cx - this.r)
            .attr('y1', this.cy)
            .attr('x2', this.cx + this.r)
            .attr('y2', this.cy);
    }

    render() {
        return <div className={`nordic-angle-icon ${this.props.className}`} ref={this.handleRef} />;
    }
}

AngleIcon.propTypes = {
    value: PropTypes.number,
    domain: PropTypes.arrayOf(PropTypes.number),
    className: PropTypes.string,
    containerWidth: PropTypes.number,
    containerHeight: PropTypes.number,
};

export default Dimensions()(AngleIcon);
