import React from "react";
import "./styles.css";
import ToDoItem from "../todo_item/todo_item";
import ToDoForm from "../todo_form/todo_form";

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", key: 0, todos: [], favorites: [] };
  }
  onChangeValue(e) {
    this.setState({ value: e.target.value });
  }
  onEscape(e, todo) {
    if (e.keyCode === 27) this.edit(todo);
  }
  toggleToDo(todo) {
    let i = this.state.todos.indexOf(todo);
    let newArr = this.state.todos;
    newArr[i].done = !newArr[i].done;
    this.setState({
      todos: newArr,
    });
    this.forceUpdate();
  }
  deleteTodo(todo) {
    let i = this.state.todos.indexOf(todo);
    let newArr = this.state.todos;
    newArr.splice(i, 1);
    this.setState({
      todos: newArr,
    });
    this.forceUpdate();
  }
  edit(todo) {
    let i = this.state.todos.indexOf(todo);
    let newArr = this.state.todos;
    newArr[i].edit = !newArr[i].edit;
    this.setState({
      todos: newArr,
    });
    this.forceUpdate();
  }
  onEditSubmit(e, todo) {
    e.preventDefault();
    let i = this.state.todos.indexOf(todo);
    let newArr = this.state.todos;
    newArr[i].edit = !newArr[i].edit;
    newArr[i].value = this.state.value;
    this.setState({
      value: newArr,
    });
  }
  refresh() {
    this.setState({
      todos: [],
      favorites: [],
    });
  }
  toggleFavorite(todo) {
    let i = this.state.todos.indexOf(todo);
    let newArr = this.state.todos;
    newArr[i].favorite = !newArr[i].favorite;
    let favs = newArr.filter((item) => item.favorite === true);
    let nonFavs = newArr.filter((item) => item.favorite === false);
    nonFavs.sort((a, b) => b.id - a.id);
    this.setState({
      favorites: [...favs],
      todos: [...favs, ...nonFavs],
    });
  }
  handleInput(e) {
    e.preventDefault();
    let obj = {
      value: this.state.value,
      done: false,
      id: this.state.key,
      favorite: false,
      edit: false,
    };
    let nonFavs = this.state.todos.filter((item) => item.favorite === false);
    this.setState((state) => ({
      value: "",
      todos: [...state.favorites, obj, ...nonFavs],
      key: state.key + 1,
    }));
  }
  render() {
    let doneList = [];
    let todoList = [];
    this.state.todos.map((todo) =>
      todo.done ? doneList.push(todo) : todoList.push(todo)
    );
    return (
      <div className="app-wrapper">
        <div className="todoList">
          <ToDoForm
            todosList={this.state.todos}
            value={this.state.value}
            change={(event) => this.onChangeValue(event)}
            handleInput={(event) => this.handleInput(event)}
            refresh={() => this.refresh()}
          />
          <ul className="todoUl">
            {todoList.map((todo) => (
              <ToDoItem
                key={todo.id}
                todo={todo}
                deleteItem={() => this.deleteTodo(todo)}
                toggle={() => this.toggleToDo(todo)}
                favorite={() => this.toggleFavorite(todo)}
                edit={() => this.edit(todo)}
                change={(event) => this.onChangeValue(event)}
                submit={(e, todo) => this.onEditSubmit(e, todo)}
                escape={(e) => this.onEscape(e, todo)}
              />
            ))}
          </ul>
        </div>
        <div className="doneList">
          <h2 className={doneList.length > 0 ? "title" : "title inactive"}>
            Done
          </h2> 
          <ul className="doneUl">
            {doneList.map((todo) => (
              <ToDoItem
                key={todo.id}
                todo={todo}
                deleteItem={() => this.deleteTodo(todo)}
                toggle={() => this.toggleToDo(todo)}
                favorite={() => this.toggleFavorite(todo)}
                edit={() => this.edit(todo)}
                change={(e) => this.onChangeValue(e)}
                submit={(e, todo) => this.onEditSubmit(e, todo)}
                escape={(e) => this.onEscape(e, todo)}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default TodoList;
