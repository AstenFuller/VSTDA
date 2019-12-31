import React, { Component } from 'react';
import HighPriority from './highpriority';
import EditTodo from './edittodo';
import FirstPanel from './firstpanel';
import LowPriority from './lowpriority';
import MediumPriority from './mediumpriority';

export default class ViewTodo extends Component {
    constructor(props) {
      super(props);
  
      this.handleDeleteItem = this.handleDeleteItem.bind(this);
      this.handleEditItem = this.handleEditItem.bind(this);
      this.handleCheck = this.handleCheck.bind(this);
    }
  
    handleDeleteItem(e) {
      this.props.delete(e.target.id);
    }
  
    handleEditItem(e) {
      this.props.edit(e.target.id);
    }
  
    handleCheck(e) {
      this.props.checkBox(e.target.id);
    }
  
    render() {
      const priorityList = [];
      let i = 0;
  
      this.props.list.forEach((item) => {
        if (item.priority == 1) {
          priorityList.push(
            <LowPriority
              item={item.item}
              key={i}
              id={i}
              delete={this.handleDeleteItem}
              edit={this.handleEditItem}
              hideItem={this.props.hideItem}
              checkBox={this.handleCheck}
              completed={item.completed} />
          );
          i++;
        } else if (item.priority == 2) {
          priorityList.push(
            <MediumPriority
              item={item.item}
              key={i}
              id={i}
              delete={this.handleDeleteItem}
              edit={this.handleEditItem}
              hideItem={this.props.hideItem}
              checkBox={this.handleCheck}
              completed={item.completed} />
          );
          i++;
        } else if (item.priority == 3) {
          priorityList.push(
            <HighPriority
              item={item.item}
              key={i}
              id={i}
              delete={this.handleDeleteItem}
              edit={this.handleEditItem}
              hideItem={this.props.hideItem}
              checkBox={this.handleCheck}
              completed={item.completed} />
          );
          i++;
        }
      });
  
      return (
        <div className='col-md-8'>
          <div className='panel panel-default'>
            <div className='panel-heading'>View Todos</div>
            <div>
              <FirstPanel
                hide={this.props.hideStart}
              />
              <ul>
                {priorityList}
              </ul>
            </div>
            <div className={this.props.editItem ? 'edit' : 'hide'}>
              <EditTodo
                editText={this.props.editTodo}
                editPriority={this.props.editPriority}
                updateButton={this.props.update}
                handleEditText={this.props.handleEditText}
                handleEditPriority={this.props.handleEditPriority}
                panelType={this.props.panelType}   />
            </div>
          </div>
        </div>
      );
    }
  }