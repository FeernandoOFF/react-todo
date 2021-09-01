import React from 'react';
export function SearchTodo(props){
    return(
      <div className="searchTodos w-10/12 mx-auto my-5 p-2 rounded2xl  bg-primary-light dark:bg-primary-dark">
        <input onChange={(e)=>props.setSearchBar(e.target.value)} type="text" className="w-full rounded-md p-2 bg-secondary-light dark:bg-secondary-dark text-center"  placeholder="Buscar...."/>
      </div>
    );
}