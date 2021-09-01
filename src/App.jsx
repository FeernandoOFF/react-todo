import React, { useState } from "react";
import { TodoItem } from "./components/TodoItem";
import { SearchTodo } from "./components/SearchTodo";
import { Modal } from "./components/Modal";

function useLocalStorage(itemName, initialValue) {
  const localStorageItem = localStorage.getItem(itemName);
  let parsedItem;

  if(!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue))
    parsedItem = initialValue;
  } else {
    parsedItem = JSON.parse(localStorageItem);
  }

  const [item, setItem] = React.useState(parsedItem);

  const saveItem = (newItem) => {
    const stringifyItem = JSON.stringify(newItem);
    localStorage.setItem(itemName, stringifyItem);
    setItem(newItem);
  }

  return [item, saveItem];
}
function App() {
  let [darkMode,setDarkMode]= useLocalStorage("darkMode",true)
  let [todos, setTodos] = useLocalStorage("todos",[]);
  let [modalOptions,setModalOptions] =useState({mode:"input"})
  let [showModal, setShowModal] = useState(false);
  let [showCompleted,setShowCompleted] = useState(false)
  let [searchBar, setSearchBar] = useState("");
  let completedTodos = todos.filter((todo) => !!todo.success);
  const firstMode=()=>{
    console.log(darkMode)
    const root = window.document.documentElement;
    !!darkMode?  root.classList.add("dark"):root.classList.remove("dark")
  }
  React.useEffect(firstMode,[darkMode])
  
    

  let createTodo = (title = "Fallo", description = "fallo",id) => {
    let temp = [...todos];
    temp.push({ id, title, description, success: false });
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

  let acceptModal = (data,mode="input",id=0) => {
    let fill = data.every((item) => !!item[0] == true); // verify if the values are full
    if (!fill) {
      console.log("Fill fields");
      return false;
    }
    if(todos.length>=1){
      id = todos[todos.length-1].id;
    }
    id++;
    console.log(data,mode,id)
    setShowModal(false);
    mode=="input"?createTodo(data[0][0],data[1][0],id):null
    mode=="edit"?editTodo(data[0][0],data[1][0],id):null
  };
  let filterTodos = todos.filter((todo) =>
    todo.title.toLocaleLowerCase().includes(searchBar.toLocaleLowerCase()) && !todo.success
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
  React.useEffect(()=>{console.log("Cambio en Todos: ",todos, "COMPLETED TODOS:", completedTodos)},[todos])
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
        <p className="cursor-pointer" onClick={()=> {setDarkMode(!darkMode)}}>
          Toggle
        </p>
      </header>
      <div className="w-11/12 m-auto  md:w-2/6">
        <h1 className="font-bold text-2xl">ToDo🖐️</h1>
        <div className="tasksCompleted">
          <h2 className="text-sm my-2">
            Haz completado
            <strong>
              {completedTodos.length} de {todos.length} tareas
            </strong>
          </h2>
        </div>
        <SearchTodo setSearchBar={changeSearchBar}></SearchTodo>

        <div className="toggleTodos flex justify-between my-3">
          <p onClick={()=>setShowCompleted(false)} className={`text-xs p-3 rounded bg-secondary-light dark:bg-secondary-dark ${!showCompleted? "bg-accent dark:bg-accent ":""}`}>Mostrar Completadas</p>
          <p onClick={()=>setShowCompleted(true)} className={`text-xs p-3 rounded bg-secondary-light dark:bg-secondary-dark ${showCompleted? "bg-accent dark:bg-accent ":""}`}>Mostrar Incompletos</p>
        </div>
        <div className="todoList overflow-y-auto h-72 p-3">
          {
          !showCompleted?
            filterTodos.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  onEdit={()=>openModal({mode: 'edit',inputs:["Nombre","Descripcion"],title:"Editar ToDo",defaultValue:[todo.title,todo.description],id:todo.id})}
                ></TodoItem>
              );
            })
          :
            completedTodos.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  onEdit={()=>openModal({mode: 'edit',inputs:["Nombre","Descripcion"],title:"Editar ToDo",defaultValue:[todo.title,todo.description],id:todo.id})}
                ></TodoItem>
              );
            })
        }
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
