import React, { Fragment, useState, useEffect } from 'react';
import { login } from '../../actions/auth';
import { alert } from '../../actions/auth';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Alert from './Alert';

import styled from 'styled-components';
import DataForm from '../../styled/DataForm';
import DataField from '../../styled/DataField';
import Button from '../../styled/Button';

const Title = styled.h3`
	letter-spacing: 1.25px;
	margin-bottom: 0.75em;
`;

const Container = styled.div`
	transform: translate(-50%, -50%);
	position: absolute;
	top: 50%;
	left: 50%;
	overflow: auto;
	width: 80%;
`;

const StyledSubmit = styled(Button)`
	height: 4em;
	width: 15em;
	font-size: 1em;
	margin: 2em auto 1em auto;
	letter-spacing: 2.5px;
	border-radius: 6px;
`;

const Login = ({ login, isAuthenticated, alertMessage }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		login(email, password);
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<Fragment>
			<DataForm onSubmit={(e) => onSubmit(e)}>
				<Title>Login</Title>
				<DataField>
					<label htmlFor='email'>email</label>
					<input
						type='email'
						name='email'
						value={email}
						required
						onChange={(e) => onChange(e)}
						minLength='6'
					/>
				</DataField>
				<DataField>
					<label htmlFor='password'>password</label>
					<input
						type='password'
						name='password'
						value={password}
						required
						onChange={(e) => onChange(e)}
						minLength='6'
					/>
				</DataField>
				<StyledSubmit>Login</StyledSubmit>
			</DataForm>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	alertMessage: state.alert.alertMessage,
});

export default connect(mapStateToProps, { login })(Login);
