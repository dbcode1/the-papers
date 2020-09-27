
import React, { Fragment, useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import {NavBar} from '../layout/Nav'

import {searchNews} from '../../actions/searchNews';
import {addCard, getCards, retrieveCards} from '../../actions/card';
import {getCollections, addCollection} from '../../actions/collection'

import styled from 'styled-components'
import Input from '../../styled/Input'
import Button from '../../styled/Button';
import DataForm from '../../styled/DataForm';
import DataField from '../../styled/DataField'
import DataCard from '../../styled/DataCard'
import Nav from '../../styled/Nav'

import BackButton from '../../styled/BackButton'

import {Delete} from '@styled-icons/material/Delete'
import {Add} from '@styled-icons/material/Add'
import {Expand} from '@styled-icons/boxicons-regular/Expand'

const StyledForm = styled.form`

`
const Header = styled.div`
	display: inline-block;
	width: 100%;
`

const Wrapper = styled.div`
	height: 100vh;
	width: 100vw;
	margin: 180px 0 0 0;
	padding: 0;
	overflow-x: hidden;
	form {
		display: flex;
		margin: 0;
		padding: 0;
		width: 100%;
		background-color: #fff;
		position: fixed;
		top: 0;
		left: 0;
		box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
	}
`
const SearchInput = styled(Input)`
	border: grey;
`
const SearchTitle = styled.h5`
	text-align:center;
	padding: 4px 0 15px 0;
`
const CollectionCard = styled(DataCard)`
  ul {
		list-style: none;
		padding: 0 0 10px 0;
		margin: 0;
		li select { 
			color: grey; 
			width: 100%;
			border-radius: 0;
			border: 1px solid Gainsboro;
			text-align-last:center;
			&:focus { outline: none;}
			option {
				text-align: center;
			}
			
	 }
	}

`


const Search = ( props, {searchResults, searchNews, isAuthenticated, getCollections, addCard, retrieveCards }) => {
	useEffect(() => {
		props.getCollections()
	},[])

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

	const selectClick = (e) => {
		const selectCollections = props.getCollections()
		return selectCollections
	}

	const history = useHistory();
	const back = () => {
		const path = '/dashboard'
		history.push(path)
	}

	function addToCollection (e, title, img, url) {
		const searchTitle = e.target.value
		props.addCard(title, img, url, searchTitle)
	}

	const path = props.searchResults.data
		return (
			<Wrapper>
				<form onSubmit={(e) => onSubmit(e)}>
						{/* */}
					<SearchInput>
							<input
								type='text'
								name='searchTerm'
								value={searchTerm}
								placeholder="Enter Term"
								required
								onChange={(e) => onChange(e)}
								minLength='3'
									/>
					</SearchInput>
					<Button>Search</Button>	
				</form>
				<div>
					{path && (path.map(article => {
						// grab data
						const title = article.title
						const img = article.img
						const url = article.url
						// const containerTitle = collection.title

						 return(
							<CollectionCard id="card" >
								<ul>
									<li>
										<select  id="add" key={Math.random()} name="collections" onChange={(e) => addToCollection(e, title, img, url)} >
											<option>Add to Collection</option>
										{props.collectionResults.map(collection => {

											return <option id={Math.random()} value={collection.title}>{collection.title}</option>	
										})}
										</select>	
									</li>
									
								</ul>					
								<a href={article.url} key={article.pub_date} id={article.pub_date}target="_blank">
								 	<SearchTitle id="title">{article.title}</SearchTitle>
								 	<img id="img" src={article.img}/>
								</a>
							</CollectionCard>

						 ) 
					}))}
				</div>


			<NavBar></NavBar>
	
			</Wrapper>	

	)
};

const mapStateToProps = (state) => ({
	searchResults: state.searchNews.searchResults,
	collectionResults: state.collection.containers,
	alertMessage: state.alert.alertMessage,
	isAuthenticated: state.isAuthenticated
});

export default connect(mapStateToProps, {searchNews, getCollections, addCard, retrieveCards})(Search);
