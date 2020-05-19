import React from 'react';
import styled from 'styled-components';
import DataForm from '../../styled/DataForm';
import DataField from '../../styled/DataField';
import Nav from '../../styled/Nav';
import Button from '../../styled/Button';

const OptionsButton = styled(Button)`
	height: 4em;
	width: 15em;
	font-size: 1em;
	margin: 2em auto 1em auto;
	letter-spacing: 2.5px;
	border-radius: 6px;
`;

const Collection = () => {
	return (
		<DataForm>
			<DataField></DataField>
			<DataField></DataField>
		</DataForm>
	);
};

export default Collection;
