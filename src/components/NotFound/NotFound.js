import PropTypes from 'prop-types';
import React from 'react';
import s from './NotFound.module.css';

export default function NotFound({ request }) {
  return (
    <div className={s.NotFound}>
      Sorry, we have not pictures for request : '{request}'
    </div>
  );
}

NotFound.propTypes = {
  error: PropTypes.string,
};
