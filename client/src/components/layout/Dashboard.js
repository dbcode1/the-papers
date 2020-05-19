import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { searchNews } from '../../actions/searchNews';
import DataView from '../layout/DataView';

import styled from 'styled-components';
import Nav from '../../styled/Nav';
import Button from '../../styled/Button';
import Content from '../../styled/Content';
import Header from '../../styled/Header';
import Global from '../../styled/Global';

const DashBoard = ({ searchNews, isAuthenticated }) => {
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
						<Link to='/search'>Search</Link>
					</Button>
					<Button>
						<Link to='/collection'>Collections</Link>
					</Button>
					<Button>
						<Link to='/account'>Account</Link>
					</Button>
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
