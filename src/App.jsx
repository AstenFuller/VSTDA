import React, { Component } from 'react';
import ViewTodo from './viewtodo';
import AddTodo from './addtodo';
import Heading from './heading';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      PanelType: '',
      ItemId: 0,
      EditItem: false,
      HideItem: true,
      Start: true,
      EditTodoText: '',
      EditTodoPriority: 1,
      AddTodoText: '',
      CreateTodoPriority: 0,
      PriorityList: []
    }

    this.handleAddTodoText = this.handleAddTodoText.bind(this);
    this.handleTodoPriority = this.handleTodoPriority.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleEditTodoText = this.handleEditTodoText.bind(this);
    this.handleEditTodoPriority = this.handleEditTodoPriority.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
  }

  handleCheckBox(itemId) {
    let array = [...this.state.PriorityList];

    if (array[itemId].completed == '') {
      array[itemId].completed = 'completed';
    } else {
      array[itemId].completed = '';
    }

    this.setState({
      PriorityList: array,
    });
  }

  handleAddTodoText(todoText) {
    this.setState({
      AddTodoText: todoText,
    });
  }

  handleTodoPriority(todoPriority) {
    this.setState({
      CreateTodoPriority: todoPriority,
    });
  }

  handleEditTodoText(todoText) {
    this.setState({
      EditTodoText: todoText,
    });
  }

  handleEditTodoPriority(todoPriority) {
    this.setState({
      EditTodoPriority: todoPriority,
    });
  }

  handleAddButton(toAdd) {
    if (toAdd.priority == 0 || toAdd.item.length == 0 || !toAdd.item.trim()) {
      return;
    } else {
      this.setState({
        Start: false,
        PriorityList: [...this.state.PriorityList, toAdd],
        AddTodoText: '',
        CreateTodoPriority: 0,
      });
    }
  }

  handleDelete(toDelete) {
    var array = [...this.state.PriorityList];
    if (toDelete !== -1) {
      array.splice(toDelete, 1);
      this.setState({
        PriorityList: array
      })
    }

    if (!array || !array.length) {
      this.setState({
        Start: true,
      })
    }
  }

  handleEdit(itemId) {
    let panelType = '';

    if (this.state.PriorityList[itemId].priority == 1) {
      panelType = 'panel panel-success';
    } else if (this.state.PriorityList[itemId].priority == 2) {
      panelType = 'panel panel-warning';
    } else {
      panelType = 'panel panel-danger';
    }

    this.setState(prevState => ({
      HideItem: !prevState.HideItem
    }));
    this.setState(prevState => ({
      EditItem: !prevState.EditItem
    }));
    this.setState({
      ItemId: itemId,
      EditTodoText: this.state.PriorityList[itemId].item,
      EditTodoPriority: this.state.PriorityList[itemId].priority,
      PanelType: panelType,
    })
  }

  handleUpdate(toUpdate) {
    let array = [...this.state.PriorityList];
    let completed = array[this.state.ItemId].completed;

    this.setState(prevState => ({
      HideItem: !prevState.HideItem
    }));
    this.setState(prevState => ({
      EditItem: !prevState.EditItem
    }));
    
    array[this.state.ItemId] = toUpdate;
    toUpdate.completed = completed;

    this.setState({
      PriorityList: array,
    });
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <Heading />
          <AddTodo
            todoText={this.state.AddTodoText}
            onTodoTextChange={this.handleAddTodoText}
            todoPriority={this.state.CreateTodoPriority}
            onTodoPriorityChange={this.handleTodoPriority}
            toAdd={this.handleAddButton}
          />
          <ViewTodo
            list={this.state.PriorityList}
            hideStart={this.state.Start}
            delete={this.handleDelete}
            edit={this.handleEdit}
            hideItem={this.state.HideItem}
            editItem={this.state.EditItem}
            update={this.handleUpdate}
            editTodo={this.state.EditTodoText}
            editPriority={this.state.EditTodoPriority}
            handleEditText={this.handleEditTodoText}
            handleEditPriority={this.handleEditTodoPriority}
            panelType={this.state.PanelType}
            checkBox={this.handleCheckBox}

          />
        </div>

      </div>
    );
  }
}




export default App;
