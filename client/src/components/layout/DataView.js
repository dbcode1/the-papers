import React, { useEffect, Fragment } from 'react';
//import { Link, withRouter } from 'react-router-dom';
import { topStories } from '../../actions/topStories';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DataCard from './DataCard';
import styled from 'styled-components';

const DataView = ({ topStories }) => {
	useEffect(() => {
		topStories();
	}, [topStories]);

	return <Fragment></Fragment>;
};

DataView.propTypes = {
	currentResults: PropTypes.array.isRequired,
	searchResults: PropTypes.array.isRequired,
	topStories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	currentResults: state.topStories.currentResults,
	searchResults: state.searchNews.searchResults,
});

export default connect(mapStateToProps, { topStories })(DataView);
