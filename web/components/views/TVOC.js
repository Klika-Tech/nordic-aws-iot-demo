import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PPB } from '../../scaleUnits';
import MetricChart from '../common/MetricChart';

const mapStateToProps = state => ({
    data: state.tvoc.data,
    markersData: state.tvoc.markersData,
});

const Magnetometer = ({ data, markersData }) => (
    <MetricChart
        type="tvoc"
        units={PPB}
        data={data}
        markersData={markersData}
    />
);

export default connect(mapStateToProps)(Magnetometer);
