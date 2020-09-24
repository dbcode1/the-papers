
import React, { Fragment, useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';


import {searchNews} from '../../actions/searchNews';
import {addCard, getCards, retrieveCards} from '../../actions/card';
import {getCollections, addCollection} from '../../actions/collection'

import styled from 'styled-components'
import Button from '../../styled/Button';
import DataForm from '../../styled/DataForm';
import DataField from '../../styled/DataField'
import DataCard from '../../styled/DataCard'

import BackButton from '../../styled/BackButton'

import {Delete} from '@styled-icons/material/Delete'
import {Add} from '@styled-icons/material/Add'

const StyledForm = styled.form`
	width: 100%;
	text-align: center;
	background-color: #fff;
	position: fixed;
	padding: 16px 0 1em 0;
	top: 0;
	left: 0;
	box-shadow: 2px 2px 8px rgba(0,0,0,0.2);
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

const SearchTitle = styled.h5`
	text-align:center;
	letter-spacing: 1.25px;
	margin: 1em 0 1em;
`
const StyledSubmit = styled(Button)`
	height: 4em;
	width: 15em;
	font-size: 1em;
	margin: 1em auto 1em auto;
	letter-spacing: 2.5px;
	border-radius: 6px;
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
const CollectionCard = styled(DataCard)`
  ul {
		display: block;
	}
	li {
		display: inline-block;
		:nth-child(2n) {
			padding-left: 10px;
		}
	}
		
	}
`


const AddCollection = styled(Add)`
	width: 30px;
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

	
	const addToCollection = (title, img, url) => {
		const add = document.getElementById('add')
		let containerTitle = ''
		containerTitle = add.options[add.selectedIndex].value

		console.log('select option', containerTitle)

	
		// add to collection DB
		props.addCard(title, img, url, containerTitle)
		//props.retrieveCards()
		props.getCollections()
		// no collections alert

	}




	const handleAdd = (e) => {
		console.log(e.target.value)
		console.log('change')
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
					// grab data
					const title = article.title
					const img = article.img
					const url = article.url
					// const containerTitle = collection.title
					
					 return(
						<CollectionCard id="card" >
							<ul>
								<li>
									<select  id="add" name="collections" onChange={e => handleAdd(e)} >
									
									{props.collectionResults.map(collection => {
										
										return <option value={collection.title}>{collection.title}</option>	
									})}
									</select>	
								</li>
								<li className="add">
									<AddCollection onClick={() => addToCollection(title, img, url)}></AddCollection>
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
			<BackButton onClick={back}></BackButton>
			
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
