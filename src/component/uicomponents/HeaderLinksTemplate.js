import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/HeaderLinksTemplate.css';

const HeaderLinksTemplate = ({to, linkLabel, customLinkClass, onClick}) => {
  return (
    <NavLink to={to} className={`header-link-template__link relative ${customLinkClass}`} onClick={onClick}>
        <p className='header-link-template__label text-sm font-medium text-white lg:text-base'>{linkLabel}</p>
    </NavLink>
  )
}

export default HeaderLinksTemplate
