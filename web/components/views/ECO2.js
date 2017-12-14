import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PPM } from '../../scaleUnits';
import MetricChart from '../common/MetricChart';

const mapStateToProps = state => ({
    data: state.eco2.data,
    markersData: state.eco2.markersData,
});

const Magnetometer = ({ data, markersData }) => (
    <MetricChart
        type="eco2"
        units={PPM}
        data={data}
        markersData={markersData}
    />
);

export default connect(mapStateToProps)(Magnetometer);
