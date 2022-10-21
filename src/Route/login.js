import { createContext, useState, useEffect } from "react"
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom'
import classNames from 'classnames/bind'
import Swal from 'sweetalert2'
import axios from 'axios'
import style from './login.module.css'
import DaumPostcode from 'react-daum-postcode';
import Post from './test.js'
import '../App.css'

const cs = classNames.bind(style);

function Login() {

    let [id_check, setId_check] = useState('')

    function sign_up() {
        let id = document.getElementById('sign-up-id').value
        let pw = document.getElementById('sign-up-pw').value

        if (id_check == true) {
            axios.post('http://localhost:8000/sign-up', {
                id: id,
                pw: pw
            })
        }

    }

    function double_check() {
        let id = document.getElementById('sign-up-id').value // 회원가입 폼 ID칸에 작성한 ID값
        axios.post('http://localhost:8000/double-check', {
            id: id
        })

            .then(function (res) {

                if (res.data == true) {
                    Swal.fire('사용 가능한 아이디 입니다.')
                } else {
                    Swal.fire('이미 사용중인 아이디 입니다.')
                }
                setId_check(res.data)

            })

    }

    const [enroll_company, setEnroll_company] = useState({
        address: '',
    });

    const [popup, setPopup] = useState(false);

    const handleInput = (e) => {
        setEnroll_company({
            ...enroll_company,
            [e.target.name]: e.target.value,
        })
    }

    const handleComplete = (data) => {
        setPopup(!popup);
    }




    return (
        <>
            <div className={cs("sign-up")}>

                <div className={cs("login-container")}>
                    <div className={cs("login-modal")}>
                        <h1>LOGIN</h1>
                        <div className={cs("id-input")}>
                            <i class="fa-solid fa-user"></i>
                            <input type='text' placeholder="아이디를 입력해 주세요." />
                        </div>
                        <div className={cs("pw-input")}>
                            <i class="fa-solid fa-lock"></i>
                            <input type='password' placeholder="비밀번호를 입력해 주세요." />
                        </div>

                        <div className={cs("sign")}>
                            <button>로그인</button>
                            <button onClick={() => { document.getElementById('signup-container').style.display = 'block' }}>회원가입</button>
                        </div>
                    </div>
                </div>

                <div id='signup-container' className={cs("signup-container")}>
                    <div className={cs("signup-modal")}>
                        <div className={cs("sign-header")}>
                            <i class="fa-solid fa-xmark" onClick={() => { document.getElementById('signup-container').style.display = 'none' }}></i>
                            <h1>SIGN UP</h1>
                        </div>

                        <div className={cs("flex")}>
                            <p>이름 : </p>
                            <input type='text' />

                        </div>
                        <div className={cs("flex")}>
                            <p>아이디 :</p>
                            <input type='text' />
                            <button style={{ marginLeft: '10px' }} onClick={() => { double_check() }}>중복확인</button>
                        </div>
                        <div className={cs("flex")}>
                            <p>비밀번호 : </p>
                            <input type='text' />

                        </div>
                        <div className={cs("flex")}>
                            <p>비밀번호 확인 :</p>
                            <input type='text' />
                        </div>
                        <div className={cs("flex")}>
                            <p>이메일 :</p>
                            <input type='text' />
                        </div>
                        <button className={cs("sign-up-btn")}>회원가입</button>


                    </div>

                </div>



            </div>
            {/* <div className="address_search" >address */}



        </>
    )
}
export default Login