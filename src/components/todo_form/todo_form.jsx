import React from 'react';
import {
  IoMdAdd, IoMdRefresh,
} from "react-icons/io";
import './todo_form.css'

class ToDoForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {todoValue: ''}
    }
    onSubmit(event){
        event.preventDefault()
        this.setState({
            todoValue: ''
        })
    }
    onChangeValue(e) {
        this.setState({ todoValue: e.target.value });
      }
    render() {
        const showRefresh = this.props.todosList.length > 0;
        return (
        <form className="todo-form" onSubmit={(event) => {this.props.handleInput(event); this.onSubmit(event)}}>
          <label htmlFor="todo" className="title">
            ToDo
          </label>
          <div className="input-div">
            <input
              value={this.state.todoValue}
              onChange={(e) => {this.props.change(e); this.onChangeValue(e)}}
              type="text"
              className="main-input"
              placeholder="write it all down"
            ></input>
            <button>
              <IoMdAdd className="add-icon" />
            </button>
            {showRefresh ? (<IoMdRefresh className="refresh" onClick={() => this.props.refresh()}/>) : (<span></span>)}
          </div>
        </form>
    )}
}

export default ToDoForm