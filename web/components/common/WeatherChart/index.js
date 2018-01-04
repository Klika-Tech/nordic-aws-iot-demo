import React, { Component, PropTypes } from 'react';
import WeatherParams from './Params';
import WeatherChart from './Chart';
import NoDataAvailable from '../NoDataAvailable';

const WeatherChartContainer = ({
    type, chartType, displayedCitiesData, units, sensorData, markersData, citiesData,
    onChangeType, onToggleVisibility, onChangeUnits,
}) => (
    <div className="device-chart-container">
        <WeatherParams
            type={type}
            selectedUnits={units}
            chartType={chartType}
            citiesData={citiesData}
            displayedCitiesData={displayedCitiesData}
            onChangeType={onChangeType}
            onToggleVisibility={onToggleVisibility}
            onChangeUnits={onChangeUnits}
        />
        <div className="weather-chart">
            { !sensorData.length && (
                <NoDataAvailable />
            ) }
            { !!sensorData.length && (
                <WeatherChart
                    type={type}
                    chartType={chartType}
                    units={units}
                    data={sensorData}
                    markersData={markersData}
                    citiesData={displayedCitiesData}
                />
            ) }
        </div>
    </div>
);

WeatherChartContainer.propTypes = {
    type: PropTypes.string,
    units: PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
    }),
    chartType: PropTypes.string,
    sensorData: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.instanceOf(Date),
    })),
    markersData: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.instanceOf(Date),
    })),
    citiesData: PropTypes.arrayOf(PropTypes.shape({
        cityId: PropTypes.number,
        cityName: PropTypes.string,
    })),
    displayedCitiesData: PropTypes.arrayOf(PropTypes.shape({
        cityId: PropTypes.number,
        cityName: PropTypes.string,
    })),
    onChangeType: PropTypes.func,
    onToggleVisibility: PropTypes.func,
    onChangeUnits: PropTypes.func,
};

export default WeatherChartContainer;
