import React from 'react';
import classes from './Spinner.module.css';
const Spinner = (props) => (
  <div className={classes.Loader} {...props}>
    Loading...
  </div>
);

export default Spinner;
