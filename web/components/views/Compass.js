import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TESLAS } from '../../scaleUnits';
import DimensionsChart from '../common/DimensionsChart';

const mapStateToProps = state => ({
    data: state.compass.data,
    markersData: state.compass.markersData,
});

const Compass = ({ data, markersData }) => (
    <DimensionsChart
        type="compass"
        units={TESLAS}
        data={data}
        markersData={markersData}
    />
);

export default connect(mapStateToProps)(Compass);
