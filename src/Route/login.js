import { createContext, useState, useEffect } from "react"
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom'
import classNames from 'classnames/bind'
import Swal from 'sweetalert2'
import axios from 'axios'
import style from './login.module.css'
import '../App.css'

const cs = classNames.bind(style);

function Login() {

    let {id_check,setID_check} = useState('')

    function sign_up() {
        let id = document.getElementById('sign-up-id').value
        let pw = document.getElementById('sign-up-pw').value
        axios.post('http://localhost:8000/sign-up', {
            id : id ,
            pw : pw 
        })

    }

    function double_check() {
        let id = document.getElementById('sign-up-id').value // 회원가입 폼 ID칸에 작성한 ID값
        axios.post('http://localhost:8000/double-check', {
            id : id 
        })

        .then((res) => {
            console.log(res.data);
            setID_check(res.data)

        })

    }


    return (
        <>
        <div className={cs("sign-up")}>
            {/* <form action="/sign-up" method="POST"> */}
                <div className={cs("sign-up-id")}>
                <input type='text' id="sign-up-id" name="sign-up-id"></input>
                <button onClick={()=>{ double_check() }}>중복확인</button>
                </div>
                <input type='password' id="sign-up-pw" name="sign-up-pw"></input>
                <button type="submit" onClick={()=> { sign_up() }}>회원가입</button>
            {/* </form> */}

        </div>
        </>
    )
}
export default Login