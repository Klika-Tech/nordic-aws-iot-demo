import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DEGREES } from '../../scaleUnits';
import MetricChart from '../common/MetricChart';

const mapStateToProps = state => ({
    data: state.heading.data,
    markersData: state.heading.markersData,
});

const Heading = ({ data, markersData }) => (
    <MetricChart
        type="heading"
        units={DEGREES}
        data={data}
        markersData={markersData}
    />
);

export default connect(mapStateToProps)(Heading);
