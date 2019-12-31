import React, { Component } from 'react';

export default class EditTodo extends Component {
    constructor(props) {
      super(props);
  
      this.handleEditTodoText = this.handleEditTodoText.bind(this);
      this.handleEditTodoPriority = this.handleEditTodoPriority.bind(this);
      this.handleUpdate = this.handleUpdate.bind(this);
    }
  
    handleEditTodoText(e) {
      this.props.handleEditText(e.target.value);
    }
  
    handleEditTodoPriority(e) {
      this.props.handleEditPriority(e.target.value);
    }
  
    handleUpdate() {
      const toUpdate = {
        priority: this.props.editPriority,
        item: this.props.editText,
      };
  
      this.props.updateButton(toUpdate);
    }
  
    render() {
      return (
        <div>
          <div className={this.props.panelType}>
            <div className="panel-content">Description
                  <textarea className="update-todo-text"
                type="text"
                value={this.props.editText}
                onChange={this.handleEditTodoText} />
            </div>
            <div className="panel-content">Priority
                  <select className="update-todo-priority"
                value={this.props.editPriority}
                onChange={this.handleEditTodoPriority}>
                <option className="1" value="1">Low</option>
                <option className="2" value="2">Medium</option>
                <option className="3" value="3">High</option>
              </select>
            </div>
            <div className="panel-content">
              <div className="button">
                <button className="update-todo"
                  onClick={this.handleUpdate}>Save</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }