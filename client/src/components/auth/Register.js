import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

import styled from 'styled-components';
import { setAlert } from '../../actions/alert';
import DataForm from '../../styled/DataForm';
import DataField from '../../styled/DataField';
import Button from '../../styled/Button';

const Title = styled.h3`
	letter-spacing: 1.25px;
	margin-bottom: 0.75em;
`;

const StyledSubmit = styled(Button)`
	height: 4em;
	width: 15em;
	font-size: 1em;
	margin: 2em auto 1em auto;
	letter-spacing: 2.5px;
`;

const Register = ({ register, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		fullname: '',
		email: '',
		password: '',
	});

	const { fullname, email, password } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const onSubmit = (e) => {
		e.preventDefault();
		// TODO: add password one password two verify
		register({ fullname, email, password });
	};

	if (isAuthenticated) {
		return <Redirect to='/login' />;
	}

	return (
		<Fragment>
			<DataForm onSubmit={(e) => onSubmit(e)}>
				<Title>Register</Title>
				<DataField>
					<label htmlFor='fullname'>full name</label>
					<input
						type='text'
						value={fullname}
						name='fullname'
						onChange={(e) => onChange(e)}
					/>
				</DataField>
				<DataField>
					<label htmlFor='email'>email </label>
					<input
						type='email'
						value={email}
						name='email'
						onChange={(e) => onChange(e)}
					/>
				</DataField>
				<DataField>
					<label htmlFor='Password'>password </label>
					<input
						type='password'
						value={password}
						name='password'
						minLength='6'
						onChange={(e) => onChange(e)}
					/>
				</DataField>

				<StyledSubmit>Submit</StyledSubmit>
			</DataForm>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
