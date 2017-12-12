import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PPM } from '../../scaleUnits';
import MetricChart from '../common/MetricChart';

const mapStateToProps = state => ({
    data: state.tvoc.data,
    markersData: state.tvoc.markersData,
});

const Magnetometer = ({ data, markersData }) => (
    <MetricChart
        type="tvoc"
        units={PPM}
        data={data}
        markersData={markersData}
    />
);

export default connect(mapStateToProps)(Magnetometer);
