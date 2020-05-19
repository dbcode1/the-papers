import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUser } from './actions/auth';
import styled from 'styled-components';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Account from './components/auth/Account';
import Login from './components/auth/Login';
import { logout } from './actions/auth';

import Dashboard from './components/layout/Dashboard';
import Search from './components/results/Search';
import Collection from './components/results/Collection';
import setAuthToken from './utils/setAuthToken';
import Alert from './components/auth/Alert';

import PrivateRoute from './routing/PrivateRoute';
//const history = createBrowserHistory();

const Wrapper = styled.div``;

const App = () => {
	useEffect(() => {
		setAuthToken(localStorage.token);
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Route exact path='/' component={Landing} />

				<Switch>
					<Route exact path='/register' component={Register} />
					<Route exact path='/login' component={Login} />
					<PrivateRoute exact path='/dashboard' component={Dashboard} />
					<PrivateRoute exact path='/search' component={Search} />
					<PrivateRoute exact path='/collection' component={Collection} />
					<PrivateRoute exact path='/account' component={Account} />
				</Switch>
			</Router>
		</Provider>
	);
};

export default App;
