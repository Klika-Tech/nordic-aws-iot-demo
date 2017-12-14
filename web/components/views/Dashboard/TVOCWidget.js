import React from 'react';
import { connect } from 'react-redux';
import SimpleMetricChart from '../../common/SimpleMetricChart';
import { PPM } from '../../../scaleUnits';

const mapStateToProps = state => ({
    data: state.tvoc.data,
});

const TVOCWidget = ({ data, yDomain, xDomain }) => (
    <SimpleMetricChart
        type="tvoc"
        units={PPM}
        data={data}
    />
);

export default connect(mapStateToProps)(TVOCWidget);
