import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SCALAR } from '../../scaleUnits';
import DimensionsChart from '../common/DimensionsChart';

const mapStateToProps = state => ({
    data: state.gravity.data,
    markersData: state.gravity.markersData,
});

const Gravity = ({ data, markersData }) => (
    <DimensionsChart
        type="gravity"
        units={SCALAR}
        data={data}
        markersData={markersData}
    />
);

export default connect(mapStateToProps)(Gravity);
