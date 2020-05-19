import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
	display: block;
	padding: 8px;
	margin: 1em auto;
	max-width: 40%;
	text-align: center;
	font-size: 1em;
	font-weight: 500;
	text-decoration: none;
	letter-spacing: 0.8px;
	color: midnightblue;
	background-color: white;
	transition: color 0.4s;
	border: 1px solid lightcyan;
	border-radius: 4px;

	&:hover {
		text-decoration: none;
		color: orange;
	}
`;

// thanks for the demo : https://codesandbox.io/u/mjanssen/likes
