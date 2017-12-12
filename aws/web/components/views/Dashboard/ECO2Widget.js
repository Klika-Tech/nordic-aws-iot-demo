import React from 'react';
import { connect } from 'react-redux';
import SimpleMetricChart from '../../common/SimpleMetricChart';
import { PPM } from '../../../scaleUnits';

const mapStateToProps = state => ({
    data: state.eco2.data,
});

const ECO2Widget = ({ data, yDomain, xDomain }) => (
    <SimpleMetricChart
        type="eco2"
        units={PPM}
        data={data}
    />
);

export default connect(mapStateToProps)(ECO2Widget);
