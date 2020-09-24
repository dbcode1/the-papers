import React, { useState, useEffect} from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {connect} from 'react-redux'
import styled from 'styled-components';

import Input from '../../styled/Input'
import DataForm from '../../styled/DataForm';
import DataField from '../../styled/DataField';
import Nav from '../../styled/Nav';
import Button from '../../styled/Button';
import BackButton from '../../styled/BackButton'
import DataCard from '../../styled/DataCard'
import Header from '../../styled/Header'
import {Add} from '@styled-icons/material/Add'
import {DeleteOutline} from '@styled-icons/typicons/DeleteOutline'
import {Expand} from '@styled-icons/boxicons-regular/Expand'

import {getCollections} from '../../actions/collection'
import {addCollection} from '../../actions/collection'
import {deleteCollection} from '../../actions/collection'
import {deleteCards} from '../../actions/card'
import {retrieveCards} from '../../actions/card'
import {clearCards} from '../../actions/card'
import { GET_CARDS } from '../../actions/types';

import Modal from './Modal'

const Wrapper = styled.div`
	height: 100%;
	width: 100%;
	margin: 260px 0 0 0;
	padding: 0;
	ul{
		padding: 0;
		margin: 0;
	}
`

const CollectionInput = styled.div`
input {
	border: none;
	height: 5em;
	width: 15em;
	padding: 0.4em;
	text-align: center;
	border: 1px solid #85c1e9;
	color: grey;
}
`

const DeleteButton = styled(DeleteOutline)`
	width: 20px;
`
const ExpandCard = styled(Expand)`
	width: 20px;
`

const Card = styled(DataCard)`
	.wrapper { overflow: auto}
	.delete {
			float: right;
			padding-right: 3px;
	}
	.title {
		padding: 7px 0 0 7px;
		float: left;
	}
	.expand{
		float: right
	}
`

const CollectionCard = styled(DataCard)`
   margin: 35px auto 10px auto;
	}
`
const Back = styled(BackButton)`

`
const AddButton = styled(Add)`
	width: 25px;
	padding-right: 18px;
`

const Collection = (props, {addCollection, collections, getCollections, deleteCollection, deleteCards, retrieveCards, cards, clearCards}) => {
	useEffect(() => {
		props.getCollections()
	},[])

	const [formData, setFormData] = useState({
		title: '',
	});

	const { title } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		console.log("add collection")
		e.preventDefault();
		
		props.addCollection(title);
	};

	const deleteButton = (e, title, id) => {
		e.preventDefault()
		
		props.deleteCards(title)
		props.deleteCollection(title)
		props.getCollections()
	}

	const openCollection = (title) => {
		// call for all cards matching containerTitle
		//props.clearCards(title)
		console.log(title)
		props.retrieveCards(title)
	}

	const history = useHistory();
	const back = () => {
		const path = '/dashboard'
		history.push(path)
	}
	
	return (
		<Wrapper>
			<Nav>
					<Input>
						<input
						type='title'
						name='title'
						placeholder="Container Title"
						required
						onChange={(e) => onChange(e)}
						minLength='6'
					/></Input>
				<Button onClick={onSubmit}>
					<AddButton/>
				</Button>
			</Nav>

				{props.collections != undefined && props.collections.length > 0 && props.collection != 'Container exists' && (props.collections.map(collection => { 
					return(
						<Card>							
								<div class="wrapper" >
									<div class="title" key={Math.random()}><h6 >{collection.title}</h6></div>
									<div class="expand" onClick={() => openCollection(collection.title)}><ExpandCard></ExpandCard></div>
									<div class="delete" key={Math.random()}><DeleteButton id={collection._id} onClick={(e) => {deleteButton(e, `${collection.title}`)}} /></div>
									{props.cards.map(card => {
										if(collection.title == card.containerTitle){
										return (
										<CollectionCard>
												<a href={card.url}>
													{card.title}
													<img src={card.img} ></img>
												</a>
			
											</CollectionCard>
										)}else {
											return
										}
									})}
								</div>
								
						</Card>
							
					) 
				}))}
		
			
		
			
		<BackButton onClick={back}></BackButton>
		
		</Wrapper>
	);
};

// export default Collection;

const mapStateToProps = (state) => ({
	collections: state.collection.containers,
	cards: state.card.cards
});

export default connect(mapStateToProps, {addCollection, getCollections, deleteCollection, deleteCards, retrieveCards, clearCards})(Collection);



