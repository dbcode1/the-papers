import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled.button`
	display: block;
	padding: 8px;
	text-align: center;
	font-size: 1em;
	text-decoration: none;
	letter-spacing: 1.5px;
	transition-property: background-color, color, border;
	transition: 0.5s;
	border: none;
	border: 2px solid #5dade2;
	color: white;
	background-color: #5dade2;
	flex-grow: 1;
	min-width: 0;
	a {
		text-decoration: none;
	}
	&:hover {
		color: black;
		background-color: white;
		border: 2px solid blue
	}
`;
export default Button;
