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
    <div className='panel panel-success'>
      <input type="checkbox" />
      {props.item}
      <div className="icon">
        <i className="fas fa-edit"></i>
        <i className="fas fa-trash-alt" id={props.id} onClick={props.delete}></i>
      </div>
    </div>
    
  );

const MediumPriority = (props) => (
    <div className='panel panel-warning'>
      <input type="checkbox" />
      {props.item} 
      <div className="icon">
        <i className="fas fa-edit"></i>
        <i className="fas fa-trash-alt" id={props.id} onClick={props.delete}></i>
      </div>
    </div>
  );

const HighPriority = (props) => (
    <div className='panel panel-danger'>
        <input type="checkbox" />
        {props.item}
      <div className="icon">
        <i className="fas fa-edit"></i>
        <i className="fas fa-trash-alt" id={props.id} onClick={props.delete}></i>
      </div>
    </div>
);

// class EditTodo extends Component {
//   render(){
//     return(
          
//     );
//   }
// }

class ViewTodo extends Component { 
  constructor(props){
    super(props);
    
    this.handleDeleteItem = this.handleDeleteItem.bind(this);
  }

  handleDeleteItem(e){
    this.props.delete(e.target.id);
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
        delete={this.handleDeleteItem}/>
      );
      i++;}else if (item.priority == 2) {
        priorityList.push(
        <MediumPriority
        item={item.item}
        key={i}
        id={i} 
        delete={this.handleDeleteItem}/>
      );
      i++;}else if (item.priority == 3) {
        priorityList.push(
        <HighPriority
        item={item.item}
        key={i}
        id={i} 
        delete={this.handleDeleteItem}/>
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
                <textarea className="add-todo-text" 
                  type="text"
                  placeholder="Enter a todo item"
                  value={this.props.todoText} 
                  onChange={this.handleAddTodoText}/>
            </div>
            <div className="panel-content">How much of a priority is this?
                <select className="create-todo-priority"
                value={this.props.todoPriority}
                onChange={this.handleTodoPriority}>
                  <option hidden>Select Priority</option>
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
      Start: true,
      AddTodoText: '',
      CreateTodoPriority: 0,
      PriorityList: []
    }

    this.handleAddTodoText = this.handleAddTodoText.bind(this);
    this.handleTodoPriority = this.handleTodoPriority.bind(this);
    this.handleAddButton = this.handleAddButton.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  handleAddButton(toAdd) {
    if(toAdd.priority == 0 || toAdd.item.length == 0 || !toAdd.item.trim()){
      return;
    }else if (this.state.PriorityList.length >= 0 ){
      this.setState({
        Start: false,
        PriorityList: [...this.state.PriorityList, toAdd],
        AddTodoText: '',
    });
    }else{
      this.setState({
        PriorityList: [...this.state.PriorityList, toAdd],
        AddTodoText: '',
    });
  }
}

  handleDelete(toDelete) {
    var array = [...this.state.PriorityList];
    if(toDelete !== -1) {
      array.splice(toDelete,1);
      this.setState({
        PriorityList: array
      })
    }
    
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
             />
        </div>

      </div>
    );
  }
}




export default App;
