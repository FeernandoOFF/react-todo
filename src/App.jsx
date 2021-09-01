import React, { useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { SearchTodo } from "./components/SearchTodo";
import { Modal } from "./components/Modal";

function App() {
  let toggleDarkMode = () => {
    const root = window.document.documentElement;
    root.classList.toggle("dark");
    console.log("toggle");
  };

  let defaultTodos = [
    {
      id:1,
      title: "Titulo del todo",
      description: "lOVcGUoRxcEcfyvFMAnDgaF1VWw",
      success: false,
    },
    {
      id:2,
      title: "Hacer pagina Santa",
      description: "Hacer algo",
      success: false,
    },
  ];
  let [modalOptions,setModalOptions] =useState({mode:"input"})
  let [showModal, setShowModal] = useState(false);
  let [todos, setTodos] = useState(defaultTodos);
  let [searchBar, setSearchBar] = useState("");
  let completedTodos = todos.filter((todo) => !!todo.success).length;

  let createTodo = (title = "Fallo", description = "fallo") => {
    let temp = [...todos];
    if(todos.length>=1){
      let lastId = todos.reduce((lastTodo,todo)=>{ if (todo.id > lastTodo.id){return todo.id++}})
      console.log("ID:",lastId)
      temp.push({ id:lastId, title, description, success: false });
    }else{

      temp.push({ id:1, title, description, success: false });
    }

    setTodos(temp);
    console.log("New",temp)
  };
  let deleteTodo = (todo) => {
    let item = findTodo(todo);
    let temp = [...todos];
    temp.splice(item, 1);
    setTodos(temp);
  };
  let editTodo = (title,description,id)=>{
    console.log("Edit",`TITLE ${title} description ${description} id ${id}`);
    let temp = [...todos];
    let index = temp.findIndex(todo=> todo.id=== id)
    temp[index].title = title;
    temp[index].description= description;
    setTodos(temp);
  }
  let changeSearchBar = (value) => {
    setSearchBar(value);
  };

  let acceptModal = (data,mode="input",id) => {
    let fill = data.every((item) => !!item[0] == true);
    if (!fill) {
      console.log("Fill fields");
      return false;
    }
    console.log(data,mode,id)
    setShowModal(false);
    mode=="input"?createTodo(data[0][0],data[1][0]):null
    mode=="edit"?editTodo(data[0][0],data[1][0],id):null
  };
  let filterTodos = todos.filter((todo) =>
    todo.title.toLocaleLowerCase().includes(searchBar.toLocaleLowerCase())
  );

  let toggleTodo = (todo) => {
    let item = findTodo(todo);
    let temp = [...todos];
    temp[item].success = !temp[item].success;
    setTodos(temp);
    console.log(todos);
  };
  let findTodo = (todo) => {
    return todos.findIndex(
      (actualTodo) => actualTodo.description == todo.description
    );
  };
  const openModal = (options={mode:"show",title:"Ejemplo del Modal"})=>{
    setShowModal(true); 
    setModalOptions(options);

  }
  return (
    <div className="text-center min-h-screen flex flex-col bg-primary-light dark:bg-primary-dark dark:text-gray-50">
      {showModal ? (
        <Modal
          closeModal={()=>setShowModal(false)}
          acceptModal={acceptModal}
          options={modalOptions}
        />
      ) : null}
      <header className="flex justify-between p-4 font-bold bg-primary">
        <p>Todo Machne</p>{" "}
        <p className="cursor-pointer" onClick={toggleDarkMode}>
          Toggle
        </p>{" "}
      </header>
      <div className="w-11/12 m-auto  md:w-2/6">
        <h1 className="font-bold text-2xl">ToDo🖐️</h1>
        <div className="tasksCompleted">
          <h2 className="text-sm my-2">
            Haz completado
            <strong>
              {completedTodos} de {todos.length} tareas
            </strong>
          </h2>
        </div>
        <SearchTodo setSearchBar={changeSearchBar}></SearchTodo>

        <div className="todoList overflow-y-auto h-72 p-3">
          {filterTodos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                onEdit={()=>openModal({mode: 'edit',inputs:["Nombre","Descripcion"],title:"Editar ToDo",defaultValue:[todo.title,todo.description],id:todo.id})}
              ></TodoItem>
            );
          })}
        </div>
      </div>
      <div className="newTodo">
        <button
          onClick={()=>openModal({mode:"input",inputs:["Nombre","Descripcion"],title:"Nuevo ToDo"})}
          className="mx-auto my-10 py-4 px-6 rounded-full bg-accent"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default App;
