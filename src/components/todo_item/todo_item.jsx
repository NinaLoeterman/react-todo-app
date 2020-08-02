import React from "react";
import {
  IoMdTrash,
  IoMdStar,
  IoMdCreate,
  IoIosRadioButtonOff,
  IoMdCheckmarkCircle,
} from "react-icons/io";
import "./todo_item.css"

const ToDoItem = ({ todo, toggle, submit, change, escape, favorite, edit, deleteItem }) => {
  const isDone = todo.done;
  const isFavorite = todo.favorite;
  const isEditing = todo.edit;
  return (
    <li className={isEditing ? "blue_bottom_border" : ""}>
        {isDone ? (
        <IoMdCheckmarkCircle
          className="icon blue"
          onClick={() => toggle(todo)}
        />
      ) : (
        <IoIosRadioButtonOff
          className="icon"
          onClick={() => toggle(todo)}
        />
      )}
      {isEditing ? (
        <form onSubmit={(e) => submit(e, todo)}>
          <input
            autoFocus
            type="text"
            className="dark-input"
            defaultValue={todo.value}
            onChange={(e) => change(e)}
            onKeyDown={(e) => escape(e, todo)}
          ></input>
        </form>
      ) : (
        <span>{todo.value}</span>
      )}
      <div className="icon-wrapper">
        <IoMdCreate className={isEditing ? 'icon blue' : 'icon'} onClick={() => edit(todo)} />
        <IoMdStar
          className={isFavorite ? "blue icon" : "icon"}
          onClick={() => favorite(todo)}
        />
        <IoMdTrash className="icon" onClick={() => deleteItem(todo)} />
      </div>
    </li>
  );
}

export default ToDoItem;
