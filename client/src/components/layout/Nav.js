import React from 'react'
import {  Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../../styled/Button';
import BackButton from '../../styled/BackButton'
import Nav from '../../styled/Nav'

export const NavBar = () => {

  const history = useHistory();
	const back = () => {
		history.goBack()
  }

  const Wrapper = styled(Nav) `
    width: 100%;
    top:auto;
    bottom: 0;
    box-shadow: none;
  `
  const NavButton = styled.li`
    :nth-child(1){ margin-top: 4px;}
    :nth-child(4){ color: #fff; padding-bottom: 10px; }
    list-style: none;
    border: none;
    background-color: #5dade2;
    width: 30%;
    
    transition: 0.75s;
    padding: 18px 0 0 0;
    transition-property: color, background-color, border;
    &:hover { background-color: #fff; }
    .link {
      color: #fff
      text-decoration: none;
      overflow: hidden;
      padding: 20px;
      &:hover {
        color: RoyalBlue;
        text-decoration: none;
      }
    }

  `
  return(
    <Wrapper>
      <NavButton>
      <Link className="link" to='/search'>Search</Link>
      </NavButton>
      <NavButton>
        <Link className="link" to='/collection'>Collections</Link>
      </NavButton>
      <NavButton>
        <Link className="link" to='/account' >Account</Link>
      </NavButton>
      <NavButton onClick={back}>
        <BackButton></BackButton>
      </NavButton>
    </Wrapper>
  )

}