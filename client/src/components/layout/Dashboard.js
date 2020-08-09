import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { searchNews } from '../../actions/searchNews';

import styled from 'styled-components';
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

import Nav from '../../styled/Nav';
import Button from '../../styled/Button';
import Content from '../../styled/Content';
import Header from '../../styled/Header';
import Global from '../../styled/Global';

const Container = styled.div`
	transform: translate(-50%, -50%);
	position: absolute;
	top: 50%;
	left: 50%;
	overflow: auto;
	width: 80%;
`;

const NavButton = styled(Button)`
	height: 4em;
	width: 15em;
	font-size: 1em;
	margin: 2em auto 1em auto;
	letter-spacing: 2.5px;
	border-radius: 8px;
`;

const DashBoard = ({ isAuthenticated }) => {

	if (isAuthenticated !== true) {
		return <Redirect to='/' />;
	}

	// insert DataViews when ready to work with api data
	return (
		<Global>
				<Container>
					<NavButton>
					<Link to='/search'>Search</Link>
					</NavButton>
					<NavButton>
						<Link to='/collection'>Collections</Link>
					</NavButton>
					<NavButton>
						<Link to='/account' >Account</Link>
					</NavButton>
				</Container>
		
			<Content />
		</Global>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {  })(DashBoard);
