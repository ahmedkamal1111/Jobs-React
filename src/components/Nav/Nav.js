import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';

import './Nav.css';

function Nav ( props ) {
  return (
    <nav className="main-nav">
      <div className="main-nav__logo">
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>
   </nav>
  );
}

export default Nav;