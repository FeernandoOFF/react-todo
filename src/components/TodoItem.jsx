import React from 'react';
export function TodoItem(props){
    let todo = props.todo
    return(
        <div className="todoItem flex justify-between w-full shadow-md rounded-xl p-4 mx-auto my-4  bg-secondary-light dark:bg-secondary-dark">
            <label >
                <input type="radio" name="" id="" checked={todo.success}  onClick={()=>props.toggleTodo(todo)} readOnly />
            </label>
            <p onClick={()=>{console.log("click");props.onEdit()}} className={todo.success?'line-through text-left w-10/12 px-4 cursor-pointer': 'text-left  w-10/12 px-4 cursor-pointer'}>{todo.title}</p>
            <div className="option flex w-1/4 md:w-1/5 justify-between">
                <img src="https://image.flaticon.com/icons/png/512/1632/1632602.png" width="25" height="25" alt="delete"onClick={()=>props.deleteTodo(todo)} className="cursor-pointer"></img>
                <img src="https://image.flaticon.com/icons/png/512/2919/2919592.png" width="25" height="25" alt="edit" onClick={()=>{props.onEdit()}} className="cursor-pointer" ></img>
            </div>
        </div>
    );
}