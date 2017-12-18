import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const Layout = ({ children }) => {
  return (
    <div>
      <Link to="/home" >Home</Link>
      { children }
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.object
};

export default Layout;
