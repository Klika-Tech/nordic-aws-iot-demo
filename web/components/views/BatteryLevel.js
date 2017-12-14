import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PERCENTS } from '../../scaleUnits';
import MetricChart from '../common/MetricChart';

const mapStateToProps = state => ({
    data: state.batteryLevel.data,
    markersData: state.batteryLevel.markersData,
});

const Magnetometer = ({ data, markersData }) => (
    <MetricChart
        type="batteryLevel"
        units={PERCENTS}
        data={data}
        markersData={markersData}
    />
);

export default connect(mapStateToProps)(Magnetometer);
