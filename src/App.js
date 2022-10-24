import './App.css';
import { createContext, useState } from "react"
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom'
import Main from './Route/main.js'
import Todo from './Route/todo.js'
import Login from './Route/login.js'


function App() {

  
  return (
    <div>

      <Routes>
        <Route path='https://github.com/mook1212/todo-test.git' element={<Main></Main>} />

        <Route path='https://github.com/mook1212/todo-test.git/todo' element={<Todo></Todo>} />
        <Route path='https://github.com/mook1212/todo-test.git/login' element={<Login></Login>} />

      </Routes>

    </div>

  );
}

export default App;
