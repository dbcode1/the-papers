import styled from 'styled-components';

const Input = styled.div`
  input {
    border: none;
    height: 5em;
    font-size: 100%;
    width: 100%;
    padding: 0.4em;
    text-align: center;
    border: 1px solid LightBlue;
    color: grey;
  	&:focus {
      outline: none;
    }
  }

`

export default Input;

