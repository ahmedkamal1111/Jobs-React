import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../Logo/Logo';

import './Nav.css';

export default function Nav ( props ) {

  return (
    <nav className="main-nav">
      <div className="main-nav__logo">
        <NavLink>
          <Logo />
        </NavLink>
      </div>
   </nav>
  );
}