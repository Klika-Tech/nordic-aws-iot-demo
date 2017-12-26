import React from 'react';
import { connect } from 'react-redux';
import SimpleMetricChart from '../../common/SimpleMetricChart';
import { PPB } from '../../../scaleUnits';

const mapStateToProps = state => ({
    data: state.tvoc.data,
});

const TVOCWidget = ({ data, yDomain, xDomain }) => (
    <SimpleMetricChart
        type="tvoc"
        units={PPB}
        data={data}
    />
);

export default connect(mapStateToProps)(TVOCWidget);
