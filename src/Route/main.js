import { createContext, useState } from "react"
import { Route, Routes, Link, useNavigate, Outlet, Navigate } from 'react-router-dom'
import style from './main.module.css'
import classNames from 'classnames/bind'

const cs = classNames.bind(style);

function Main() {
    let navigate = useNavigate();

    return (
        <div>
            <div className={cs("main")}>
                <h1>나만의 일정 To Do List</h1>
                <button onClick={ ()=> {
                    navigate('/todo')
                }}>시작하기</button>

                <button onClick={ ()=> {
                    navigate('/login')
                }}>로그인</button>

            </div>

        </div>
    )
}

export default Main