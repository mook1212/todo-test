import { createContext, useState, useEffect } from "react"
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom'
import classNames from 'classnames/bind'
import Swal from 'sweetalert2'
import axios from 'axios'
import style from './login.module.css'
import '../App.css'

const cs = classNames.bind(style);

function Login() {
    return (
        <>
        <div className={cs("login")}>
            <form action="/login" method="POST">
                <input type='text' name="id"></input>
                <input type='password' name="pw"></input>
                <button type="submit">전송</button>
            </form>
        </div>
        </>
    )
}
export default Login