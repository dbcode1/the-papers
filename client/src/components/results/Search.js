
import React, { Fragment, useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {searchNews} from '../../actions/searchNews'
import { connect, useSelector } from 'react-redux';

import styled from 'styled-components'
import Button from '../../styled/Button';
import DataForm from '../../styled/DataForm';
import DataField from '../../styled/DataField'

import BackButton from '../../styled/BackButton'

import {Delete} from '@styled-icons/material/Delete'
import {Add} from '@styled-icons/material/Add'

const StyledForm = styled.form`
	width: 100%;
	text-align: center;
	border-bottom: 1px solid lightcyan;
	background-color: #fff;
	position: fixed;
	padding: 8px 0 1em 0;
	top: 0;
	left: 0;
`
const Header = styled.div`
	display: inline-block;
	width: 100%;
`

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	margin: 260px 0 0 0;
	padding: 0;
`

const SearchTitle = styled.h3`
	text-align:center;
	letter-spacing: 1.25px;
	margin-bottom: 0.75em;
`
const StyledSubmit = styled(Button)`
	height: 4em;
	width: 15em;
	font-size: 1em;
	margin: 1em auto 1em auto;
	letter-spacing: 2.5px;
	border-radius: 6px;
`;

const DataCard = styled.div`
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
		width: 100%;
	}
	select {
		-webkit-appearance: none;
		-moz-appearance: none;
		-ms-appearance: none;
		 -o-appearance: none;
			appearance: none;
		height: 25px;
		border: none;
		border: 1px solid grey;
		border-radius: 4px;
		margin-left: 80px;
		padding: 4px;
	}
`;

const SelectWrapper = styled.div`
	:after {
	font-size: 28px;
	position: absolute;
	top: 12px;
	right: 20px;
	color: #434B67;
	pointer-events: none;

	}
`

// const AddCollection = styled(Add)`
// 	width: 30px;
// `

const Search = ( props, {searchResults, searchNews, isAuthenticated }) => {
	const [searchWord, setSearchTerm] = useState({
		searchTerm: '',
	});

	const { searchTerm } = searchWord;

	const onChange = (e) => {
		setSearchTerm({ ...searchWord, [e.target.name]: e.target.value });
	};
	
	const onSubmit = async (e) => {
		e.preventDefault();
		props.searchNews(searchTerm)
	};

	const history = useHistory();
	const back = () => {
		const path = '/dashboard'
		history.push(path)
	}

	// onchange of select
	const addToCollection = () => {
		console.log("onchange")
	}

	const path = props.searchResults.data
	return (
		<Wrapper>
				<StyledForm onSubmit={(e) => onSubmit(e)}>
						<SearchTitle>Search for Articles</SearchTitle>
					<DataField>
							<input
								type='text'
								name='searchTerm'
								value={searchTerm}
								required
								onChange={(e) => onChange(e)}
								minLength='3'
									/>
					</DataField>
					<StyledSubmit>Search</StyledSubmit>	
				</StyledForm>
			<div>
				{path && (path.map(article => {
					 return(
						<DataCard>
							<select name="collections" id="collections" onChange={addToCollection}>
								<option value="add">Add To Collection</option>
  							<option value="Trump">Trump</option>
  							<option value="Coronavirus">Coronavirus</option>
							</select>							
							<a href={article.url} target="_blank">
							 	<h6>{article.title}</h6>
							 	<img src={article.image}/>
							</a>
						</DataCard>
							
					 ) 
				}))}
			</div>
			<BackButton onClick={back}></BackButton>
			
		</Wrapper>

	)
};

const mapStateToProps = (state) => ({
	searchResults: state.searchNews.searchResults,
	alertMessage: state.alert.alertMessage,
	isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps, {searchNews})(Search);
