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
	box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
	padding: 8px;
	margin: 0 auto;
	img {
		margin: 0 auto;
		display block;
	}
`;
const Title = styled.h3`
	padding: 8px 0;
	text-align: center;
`;
const Image = styled.p`
	text-align: center;
`;

const DataCard = () => {


	const cardReader = (e) => {
		e.preventDefault();

		// onclick link to original url in new window
		console.log("cardReader")
	}

	// map all results //
	return (
		<Container onClick={cardReader}>
			<Styledcard >
				<Title>Trumps Lies</Title>
				<img src="https://via.placeholder.com/150"></img>
				<p>Another day another litany of insults and lies</p>
			</Styledcard>
		</Container>
	);
};

DataCard.propTypes = {
	currentResults: PropTypes.array.isRequired,
	searchResults: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	searchResults: state.searchNews.searchResults,
});

export default connect(mapStateToProps)(DataCard);
