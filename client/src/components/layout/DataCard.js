import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
	padding: 8px;
`;

const Styledcard = styled.div`
	max-width: 200px;
	max-height: 500px;
	border: 1px solid light-grey;
	border-radius: 5px;
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
	padding: 8px;
`;
const Title = styled.h3`
	padding: 8px 0;
	text-align: center;
`;
const Image = styled.p`
	text-align: center;
`;

const DataCard = (topStories) => {
	if (topStories === undefined || null || '') {
		return;
	}

	return (
		<Container>
			<Styledcard>
				<Title>Trumps Lies</Title>
				<Image>image</Image>
				<p>Another day another litany of insults and lies</p>
			</Styledcard>
		</Container>
	);
};

DataCard.propTypes = {
	currentResults: PropTypes.array.isRequired,
	searchResults: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	currentResults: state.topStories.currentResults,
	searchResults: state.searchNews.searchResults,
});

export default connect(mapStateToProps)(DataCard);
