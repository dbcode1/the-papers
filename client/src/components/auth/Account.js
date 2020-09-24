import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { logout } from '../../actions/auth';
import { deleteUser } from '../../actions/auth';
import setAuthToken from '../../utils/setAuthToken';

import DataField from '../../styled/DataField';
import Nav from '../../styled/Nav';
import Button from '../../styled/Button';
import DataForm from '../../styled/DataForm'

const OptionsButton = styled(Button)`
	height: 4em;
	width: 15em;
	font-size: 1em;
	margin: 2em auto 1em auto;
	letter-spacing: 2.5px;
	border-radius: 6px;
`; 

const accountButtons = styled.div`
	transform: translate(-50%, -50%);
	position: absolute;
	top: 50%;
	left: 50%;
	overflow: auto;
	text-align: center;
	padding: 1.75em 1.5em 2.5em 1.5em;
`;

const Account = ({ logout, deleteUser, isAuthenticated }) => {
	const deleteHandler = () => {
		// setAuthToken();

		return <Redirect to='/' />;
		deleteUser();
	};
	const logoutHandler = () => {
		console.log('logout')
		setAuthToken();
		return <Redirect to='/' />;
		logout();
	};
	return (
		<DataForm>
			<DataField>
				<OptionsButton onClick={logout}>Logout</OptionsButton>
			</DataField>
			<DataField>
				<OptionsButton onClick={deleteUser}>Delete Account</OptionsButton>
			</DataField>
		</DataForm>
	);
};
const mapStateToProps = (state) => ({
	logout,
	deleteUser,
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
	logout,
	deleteUser,
})(Account);
