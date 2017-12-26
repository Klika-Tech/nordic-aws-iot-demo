import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import Main from './layout/Main';
import Dashboard from './views/Dashboard';
import Barometer from './views/Barometer';
import Humidity from './views/Humidity';
import Temperature from './views/Temperature';
import ECO2 from './views/ECO2';
import TVOC from './views/TVOC';
import Gyroscope from './views/Gyroscope';
import Accelerometer from './views/Accelerometer';
import Compass from './views/Compass';
import Gravity from './views/Gravity';
import Heading from './views/Heading';
import BatteryLevel from './views/BatteryLevel';
import '../theme/bootstrap.scss';

const RouterComponent = ({ store }) => (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={Main}>
                <IndexRedirect to="/dashboard" />
                <Route path="dashboard" component={Dashboard} />
                <Route path="temperature" component={Temperature} />
                <Route path="humidity" component={Humidity} />
                <Route path="barometer" component={Barometer} />
                <Route path="eco2" component={ECO2} />
                <Route path="tvoc" component={TVOC} />
                <Route path="accelerometer" component={Accelerometer} />
                <Route path="gyroscope" component={Gyroscope} />
                <Route path="compass" component={Compass} />
                <Route path="gravity" component={Gravity} />
                <Route path="heading" component={Heading} />
                <Route path="battery" component={BatteryLevel} />
            </Route>
        </Router>
    </Provider>
);

export default RouterComponent;
