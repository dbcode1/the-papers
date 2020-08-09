import React, {Fragment, useState} from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {connect} from 'react-redux'
import styled from 'styled-components';
import DataForm from '../../styled/DataForm';
import DataField from '../../styled/DataField';
import Nav from '../../styled/Nav';
import Button from '../../styled/Button';
import BackButton from '../../styled/BackButton'
import Header from '../../styled/Header'
import {getCollections} from '../../actions/collection'

import {addCollection} from '../../actions/collection' 

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


const Collection = (props, {searchResults, addCollection, getCollections}) => {

	const [formData, setFormData] = useState({
		title: '',
	});

	const { title } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const onSubmit = (e) => {
		e.preventDefault();

		props.addCollection(title);
		props.getCollections()
	};

	const history = useHistory();
	const back = () => {
		const path = '/dashboard'
		history.push(path)
	}
	return (
		<Fragment>
				<Nav>
					<CollectionInput>
						<input
						type='title'
						name='title'
						placeholder="Container Title"
						required
						onChange={(e) => onChange(e)}
						minLength='6'
					/></CollectionInput>
			<Button onClick={onSubmit}>
			Add
			{console.log(props.searchResults)}
			</Button>
				</Nav>
		
			
		
			
		<BackButton onClick={back}></BackButton>
		
		</Fragment>
	);
};

// export default Collection;

const mapStateToProps = (state) => ({
	collections: state.collections
});

export default connect(mapStateToProps, {addCollection, getCollections})(Collection);



