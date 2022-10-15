import { createContext, useState } from "react"
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom'
import style from './todo.module.css'
import classNames from 'classnames/bind'

const cs = classNames.bind(style);

function Todo() {
    return(
        <>
        <div className={cs('todo-container')}>

            <div className={cs("container1")}>

                <div className={cs("todo")}>
                    <div className={cs("todo-header")}>

                    </div>

                    <div className={cs("todo-main")}>

                    </div>

                </div>
                
            </div>

            <div className={cs("container2")}>
                <div className={cs("calendar")}>

                </div>

                <div className={cs("memo")}>

                </div>

            </div>

        </div>
        </>
    )
}

export default Todo