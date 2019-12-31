import React, { Component } from 'react';

export default class AddTodo extends Component {
    constructor(props) {
      super(props);
  
      this.handleAddTodoText = this.handleAddTodoText.bind(this);
      this.handleTodoPriority = this.handleTodoPriority.bind(this);
      this.handleAddButton = this.handleAddButton.bind(this);
    }
  
    handleAddTodoText(e) {
      this.props.onTodoTextChange(e.target.value);
    }
  
    handleTodoPriority(e) {
      this.props.onTodoPriorityChange(e.target.value);
    }
  
    handleAddButton() {
      const toAdd = {
        priority: this.props.todoPriority,
        item: this.props.todoText,
        completed: '',
      };
  
      this.props.toAdd(toAdd);
    }
  
    render() {
      return (
        <div className='col-md-4'>
          <div className='panel panel-default'>
            <div className="panel-heading">Add New Todo
              </div>
            <div className="panel-content">I want to..
                  <textarea className="create-todo-text"
                type="text"
                placeholder="Enter a todo item"
                value={this.props.todoText}
                onChange={this.handleAddTodoText} />
            </div>
            <div className="panel-content">How much of a priority is this?
                  <select className="create-todo-priority"
                value={this.props.todoPriority}
                onChange={this.handleTodoPriority}>
                <option className="0" value="0">Select Priority</option>
                <option className="1" value="1">Low</option>
                <option className="2" value="2">Medium</option>
                <option className="3" value="3">High</option>
              </select>
            </div>
            <div className="panel-footer">
              <button className="create-todo"
                onClick={this.handleAddButton}>Add</button>
            </div>
          </div>
        </div>
      );
    }
  }