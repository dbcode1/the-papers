import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { searchNews } from '../../actions/searchNews';
import DataView from '../layout/DataView';

import styled from 'styled-components';
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

import Nav from '../../styled/Nav';
import Button from '../../styled/Button';
import Content from '../../styled/Content';
import Header from '../../styled/Header';
import Global from '../../styled/Global';

const DashBoard = ({ searchNews, isAuthenticated }) => {

	// Modal //
	const StyledModal = Modal.styled`
	width: 20rem;
	height: 20rem;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: white;
	opacity: ${props => props.opacity};
	transition: opacity ease 500ms;
	`;

	function FancyModalButton() {

		const [isOpen, setIsOpen] = useState(false);
		const [opacity, setOpacity] = useState(0);

		function toggleModal(e) {
			setIsOpen(!isOpen);
		}

		function afterOpen() {
			setTimeout(() => {
			setOpacity(1);
			}, 10);
		}

		function beforeClose() {
			return new Promise(resolve => {
			setOpacity(0);
			setTimeout(resolve, 200);
			});
		}

		return (
			<div>
			<button onClick={toggleModal}>Account</button>
			<StyledModal
				isOpen={isOpen}
				afterOpen={afterOpen}
				beforeClose={beforeClose}
				onBackgroundClick={toggleModal}
				onEscapeKeydown={toggleModal}
				opacity={opacity}
				backgroundProps={{ opacity }}
			>
				<span>Account</span>
				<button onClick={toggleModal}>Close me</button>
			</StyledModal>
			</div>
		);
	}

	// Search //
	const [searchTerm, setSearchTerm] = useState('');

	const onChange = (e) => setSearchTerm(e.target.value);

	const onSubmit = (e) => {
		e.preventDefault();
		searchNews(searchTerm);
	};

	if (isAuthenticated !== true) {
		return <Redirect to='/' />;
	}

	// insert DataViews when ready to work with api data
	return (
		<Global>
			<Header>
				<Nav>
					<Button>
						Search
					</Button>
					<Button>
						<Link to='/collection'>Collections</Link>
					</Button>
					
					<FancyModalButton />
					
				</Nav>
			</Header>
			<DataView />

			<Content />
		</Global>
	);
};

const mapStateToProps = (state) => ({
	searchNews: PropTypes.func.isRequired,
	currentResults: state.topStories.currentResults,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { searchNews })(DashBoard);
