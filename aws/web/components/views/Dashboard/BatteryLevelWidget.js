import React from 'react';
import { connect } from 'react-redux';
import SimpleMetricChart from '../../common/SimpleMetricChart';
import { PERCENTS } from '../../../scaleUnits';

const mapStateToProps = state => ({
    data: state.batteryLevel.data,
});

const BatteryWidget = ({ data, yDomain, xDomain }) => (
    <SimpleMetricChart
        type="batteryLevel"
        units={PERCENTS}
        data={data}
    />
);

export default connect(mapStateToProps)(BatteryWidget);
