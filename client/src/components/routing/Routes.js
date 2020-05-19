<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
						<PrivateRoute path='/dashboard' component={DashBoard}>
							<DashBoard />
						</PrivateRoute>