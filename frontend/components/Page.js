import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

export default function Page({ children }) {
  return (
    <div>
      <Header />
      <p>I am a page compontnt</p>
      <div>{children}</div>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
