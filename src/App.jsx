import React, { Component } from 'react';

const FirstPanel = (props) => (
    <div className={props.hide ? 'panel panel-info': 'hide'}>
      <h4>Welcome to Very Simple Todo App!</h4>
      <p>Get started by adding a new Todo on the left.</p>
    </div>
);

const Heading = () => (
  <div className='heading'>
    <h1 className='bold'>Very Simple Todo App</h1>
    <h3>Track all of the things</h3>
  </div>
);

const LowPriority = (props) => (
    <div className={props.hideItem ? 'panel panel-success' : 'hide'}>
      <div className={props.completed}>
       <input type="checkbox" id={props.id} onClick={props.checkBox} />
         {props.item}
        <div className="icon">
          <i className="fas fa-edit" id={props.id} onClick={props.edit}></i>
          <i className="fas fa-trash-alt" id={props.id} onClick={props.delete}></i>
        </div>
        </div>
    </div>  
  );

const MediumPriority = (props) => (
    <div className={props.hideItem ? 'panel panel-warning' : 'hide'}>
      <div className={props.completed}>
       <input type="checkbox" id={props.id} onClick={props.checkBox} />
         {props.item}
        <div className="icon">
          <i className="fas fa-edit" id={props.id} onClick={props.edit}></i>
          <i className="fas fa-trash-alt" id={props.id} onClick={props.delete}></i>
        </div>
        </div>
    </div>  
  );

const HighPriority = (props) => (
    <div className={props.hideItem ? 'panel panel-danger' : 'hide'}>
      <div className={props.completed}>
       <input type="checkbox" id={props.id} onClick={props.checkBox} />
         {props.item}
        <div className="icon">
          <i className="fas fa-edit" id={props.id} onClick={props.edit}></i>
          <i className="fas fa-trash-alt" id={props.id} onClick={props.delete}></i>
        </div>
        </div>
    </div>  
);


class EditTodo extends Component {
  constructor(props){
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
      const toUpdate= {
        priority: this.props.editPriority,
        item: this.props.editText,
      };
      
      this.props.updateButton(toUpdate);
  }


  render(){
    return(
      <div>
        <div className={this.props.panelType}>
            <div className="panel-content">Description
                <textarea className="update-todo-text" 
                  type="text"
                  value={this.props.editText} 
                  onChange={this.handleEditTodoText}/>
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

class ViewTodo extends Component { 
  constructor(props){
    super(props);
    
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleEditItem = this.handleEditItem.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleDeleteItem(e){
    this.props.delete(e.target.id);
  }

  handleEditItem(e){
    this.props.edit(e.target.id);
  }

  handleCheck(e) {
    this.props.checkBox(e.target.id);
  }

  render() {
    const priorityList = [];
    let i = 0;

    this.props.list.forEach((item) => {
      if(item.priority == 1){
        priorityList.push(
        <LowPriority
        item={item.item}
        key={i}
        id={i}
        delete={this.handleDeleteItem}
        edit={this.handleEditItem}
        hideItem={this.props.hideItem}
        checkBox={this.handleCheck}
        completed={item.completed}/>
      );
      i++;}else if (item.priority == 2) {
        priorityList.push(
        <MediumPriority
        item={item.item}
        key={i}
        id={i}
        delete={this.handleDeleteItem}
        edit={this.handleEditItem}
        hideItem={this.props.hideItem}
        checkBox={this.handleCheck}
        completed={item.completed}/>
      );
      i++;}else if (item.priority == 3) {
        priorityList.push(
        <HighPriority
        item={item.item}
        key={i}
        id={i}
        delete={this.handleDeleteItem}
        edit={this.handleEditItem}
        hideItem={this.props.hideItem}
        checkBox={this.handleCheck}
        completed={item.completed}/>
        );
      i++;}
    });

    return(
     <div className='col-md-8'>
       <div className='panel panel-default'>
         <div className='panel-heading'>View Todos</div>
         <div>
           <FirstPanel 
           hide={this.props.hideStart} 
           />
           {priorityList}
         </div>
         <div className={this.props.editItem ? 'edit' : 'hide'}>
            <EditTodo 
            editText={this.props.editTodo}
            editPriority={this.props.editPriority}
            updateButton={this.props.update}
            handleEditText={this.props.handleEditText}
            handleEditPriority={this.props.handleEditPriority}
            panelType={this.props.panelType}
          
            />
         </div>
       </div>
     </div>
   );
  }
}

class AddTodo extends Component {
  constructor(props){
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
    const toAdd= {
      priority: this.props.todoPriority,
      item: this.props.todoText,
      completed: '',
    };
    
    this.props.toAdd(toAdd);
  }
  
  render(){

    return(
        <div className='col-md-4'>
          <div className='panel panel-default'>
            <div className="panel-heading">Add New Todo
            </div>
            <div className="panel-content">I want to..
                <textarea className="create-todo-text" 
                  type="text"
                  placeholder="Enter a todo item"
                  value={this.props.todoText} 
                  onChange={this.handleAddTodoText}/>
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

class App extends Component {
  constructor(props){
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

    if(array[itemId].completed == '') {
      array[itemId].completed = 'completed';
    }else{
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
    if(toAdd.priority == 0 || toAdd.item.length == 0 || !toAdd.item.trim()){
      return;
    }else {
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
    if(toDelete !== -1) {
      array.splice(toDelete, 1);
      this.setState({
        PriorityList: array
      })
    }

    if(!array || !array.length){
      this.setState({
        Start: true,
      })
    }
  }

  handleEdit(itemId){
    let panelType = '';

    if(this.state.PriorityList[itemId].priority == 1){
      panelType = 'panel panel-success';
    }else if (this.state.PriorityList[itemId].priority == 2){
      panelType = 'panel panel-warning';
    }else {
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

  handleUpdate(toUpdate){
    var array = [...this.state.PriorityList];
    
    this.setState(prevState => ({
      HideItem: !prevState.HideItem
    }));
    this.setState(prevState => ({
      EditItem: !prevState.EditItem
    }));

    array[this.state.ItemId] = toUpdate;

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
