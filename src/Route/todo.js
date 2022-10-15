import { createContext, useState } from "react"
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom'
import style from './todo.module.css'
import classNames from 'classnames/bind'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

const cs = classNames.bind(style);

function Todo() {

    const [value, onChange] = useState(new Date());

    return (
        <>
            <div className={cs('todo-container')}>

                <div className={cs("container1")}>

                    <div className={cs("todo")}>
                        <div className={cs("todo-header")}>

                            <h1>To Do List</h1>
                            <h2>{moment(value).format("YYYY년 MM월 DD일")} </h2>
                        </div>

                        <div className={cs("todo-main")}>

                        </div>

                    </div>

                </div>

                <div className={cs("container2")}>
                    <div className={cs("todo-calendar")}>
                        <Calendar className={cs('calendar')} onChange={onChange} value={value} />
                    </div>

                    <div className={cs("memo")}>

                    </div>

                </div>

            </div>
        </>
    )
}

export default Todo