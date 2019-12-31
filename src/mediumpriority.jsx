import React from 'react';

export default props => (
    <li className={props.hideItem ? 'panel panel-warning' : 'hide'}>
      <div className={props.completed}>
        <input type="checkbox" id={props.id} onClick={props.checkBox} />
        {props.item}
        <div className="icon">
          <i className="fas fa-edit edit-todo" id={props.id} onClick={props.edit}></i>
          <i className="fas fa-trash-alt delete-todo" id={props.id} onClick={props.delete}></i>
        </div>
      </div>
    </li>
  );