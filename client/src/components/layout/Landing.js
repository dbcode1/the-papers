import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import GlobalLink from '../../styled/GlobalLink';
import styled from 'styled-components';
import { Archive } from '@styled-icons/heroicons-outline/Archive';
import { NewsPaper } from '@styled-icons/zondicons/NewsPaper';
import { FolderOpen } from '@styled-icons/fa-regular/FolderOpen';
import { RightArrowAlt } from '@styled-icons/boxicons-regular/RightArrowAlt';

const Container = styled.div`
	transform: translate(-50%, -50%);
	position: absolute;
	top: 50%;
	left: 50%;
	overflow: auto;
	width: 80%;
`;

const Icons = styled.div`
	margin: 1em auto 1.5 auto;
	text-align: center;
	label {
		display: block;
	}
`;
const StyledFolder = styled(FolderOpen)`
	width: 4em;
	position: relative;
	top: 1.45em;
	left: 0.5em;
`;

const StyledArchive = styled(Archive)`
	width: 4em;
`;

const StyledNewsPaper = styled(NewsPaper)`
	width: 3em;
`;

const StyledArrow = styled(RightArrowAlt)`
	width: 2em;
`;

const Description = styled.div`
	margin: 1em auto 2em auto;
	p {
		text-align: center;
		font-size: 2em;
		font-size: 4vw;
	}
`;

const Title = styled.h3`
	font-size: 2.75em;
	font-family: 'Jost', sans-serif;
	text-align: center;
	letter-spacing: 1px;
`;

const Styledlink = styled(GlobalLink)``;

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<Container>
			<Title>The Papers.</Title>
			<Description>
				<p>
					Read news articles from a vast archive of trusted sources and create
					collections for future reading.
				</p>
				<Icons>
					<StyledArchive />
					<StyledArrow />
					<StyledNewsPaper />
					<StyledArrow />
					<StyledFolder />
				</Icons>
			</Description>
			<Styledlink to='/register'>Register</Styledlink>
			<Styledlink to='/login'>Login</Styledlink>
		</Container>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Landing);
