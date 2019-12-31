import React from 'react';

export default props => (
    <div className={props.hide ? 'panel panel-info' : 'hide'}>
      <h4>Welcome to Very Simple Todo App!</h4>
      <p>Get started by adding a new Todo on the left.</p>
    </div>
  );