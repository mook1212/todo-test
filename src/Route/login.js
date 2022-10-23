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

    let [id_double, setId_double] = useState('')
    let [ID_check, setID_check] = useState('')
    let [pw_check, setPw_check] = useState('')
    let [em_check, setEm_check] = useState('')
    let [ph_check, setPh_check] = useState('')

    // 회원가입
    function sign_up() {
        let name = document.getElementById('sign-up-name').value
        let id = document.getElementById('sign-up-id').value
        let pw = document.getElementById('sign-up-pw').value
        let em = document.getElementById('sign-up-em').value
        let ph = document.getElementById('sign-up-phone').value

        if (id_double == true && ID_check == true && pw_check == true && em_check == true && ph_check == true) {
            axios.post('http://localhost:8000/sign-up', {
                name: name,
                id: id,
                pw: pw,
                email: em,
                phone: ph
            })
                .then(res => {
                })

                .catch(() => {
                    console.log("실패");
                });
            Swal.fire('회원가입 완료! 환영합니다.')
            name = ''
            id = ''
            pw = ''
            em = ''
            ph = ''
            document.getElementById('signup-container').style.display = 'none'

        } else {
            Swal.fire({
                title: "Error!",
                text: "정보를 다시 확인하여 주세요.",
                icon: "error",
                confirmButtonText: "확인"
            })
        }


    }

    // 아이디 중복검사
    function double_check() {
        let id = document.getElementById('sign-up-id').value // 회원가입 폼 ID칸에 작성한 ID값
        axios.post('http://localhost:8000/double-check', {
            id: id
        })

            .then(function (res) {

                if (res.data == true) {
                    document.getElementById('sign-up-id').style.borderColor = 'green'
                    Swal.fire('사용 가능한 아이디 입니다.')
                } else {
                    document.getElementById('sign-up-id').style.borderColor = 'red'
                    Swal.fire('이미 사용중인 아이디 입니다.')
                }
                setId_double(res.data)

            })
    }


    //아이디 유효성 검사
    const checkid = (e) => {
        //  6 ~ 20자 영문, 숫자 조합
        var regExp = /^[a-z]+[a-z0-9]{5,19}$/
        // 형식에 맞는 경우 true 리턴
        console.log('아이디 유효성 검사 :: ', regExp.test(e.target.value))
        setID_check(regExp.test(e.target.value))

    }

    //비밀번호 유효성 검사
    const checkPassword = (e) => {
        //  8 ~ 10자 영문, 숫자 조합
        var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
        // 형식에 맞는 경우 true 리턴
        console.log('비밀번호 유효성 검사 :: ', regExp.test(e.target.value))
        setPw_check(regExp.test(e.target.value))
        if (regExp.test(e.target.value) == true) {
            e.target.style.borderColor = 'green'
        } else {
            e.target.style.borderColor = 'red'
        }

    }

    //비밀번호 확인
    const checkpw = (e) => {
        let pw1 = document.getElementById('sign-up-pw').value
        let pw2 = document.getElementById('pw-check').value
        if (pw1 == pw2) {
            e.target.style.borderColor = 'green'
        } else {
            e.target.style.borderColor = 'red'
        }
    }

    // 이메일 유효성 검사
    const checkEmail = (e) => {
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
        // 형식에 맞는 경우 true 리턴
        console.log('이메일 유효성 검사 :: ', regExp.test(e.target.value))
        setEm_check(regExp.test(e.target.value))

        if (regExp.test(e.target.value) == true) {
            e.target.style.borderColor = 'green'
        } else {
            e.target.style.borderColor = 'red'
        }

    }

    // 핸드폰번호 유효성 검사
    const checkPhonenumber = (e) => {
        // '-' 입력 시
        var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/
        // 숫자만 입력시
        var regExp2 = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
        // 형식에 맞는 경우 true 리턴
        console.log('핸드폰번호 유효성 검사 :: ', regExp.test(e.target.value))
        setPh_check(regExp.test(e.target.value))

        if (regExp.test(e.target.value) == true) {
            e.target.style.borderColor = 'green'
        } else {
            e.target.style.borderColor = 'red'
        }
    }

    // 로그인
    function sign_in() {

        let id = document.getElementById('sign-in-id').value
        let pw = document.getElementById('sign-in-pw').value

        if (id == '' || pw == '') {
            Swal.fire('아이디 또는 비밀번호를 확인해 주세요.')
        } else {
            axios.post('http://localhost:8000/login', {
                id: id,
                pw: pw,
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data == id) {
                        window.localStorage.setItem('token', id)
                        window.location.href = '/'
                    } else {
                        Swal.fire('존재하지 않는 회원입니다.')
                    }
                })
        }

    }


    return (
        <>
            <div className={cs("sign-up")}>

                {/* 로그인 */}
                <div className={cs("login-container")}>
                    <div className={cs("login-modal")}>
                        <h1>LOGIN</h1>

                        <div className={cs("id-input")}>
                            <i class="fa-solid fa-user"></i>
                            <input id="sign-in-id" type='text' name="id" placeholder="아이디를 입력해 주세요." />
                        </div>
                        <div className={cs("pw-input")}>
                            <i class="fa-solid fa-lock"></i>
                            <input id="sign-in-pw" type='password' name="pw" placeholder="비밀번호를 입력해 주세요." />
                        </div>
                        <button type="submit">버튼</button>

                        <div className={cs("sign")}>
                            <button onClick={sign_in}>로그인</button>
                            <button onClick={() => { document.getElementById('signup-container').style.display = 'block' }}>회원가입</button>
                        </div>
                    </div>
                </div>


                {/* 회원가입 */}
                <div id='signup-container' className={cs("signup-container")}>
                    <div className={cs("signup-modal")}>
                        {/* <form> */}
                        <div className={cs("sign-header")}>
                            <i class="fa-solid fa-xmark" onClick={() => { document.getElementById('signup-container').style.display = 'none' }}></i>
                            <h1>SIGN UP</h1>
                        </div>

                        <div className={cs("flex")}>
                            <p>이름 : </p>
                            <div className={cs("")}>
                                <input id="sign-up-name" type='text' />
                            </div>

                        </div>

                        <div className={cs("flex", 'sign-id')}>
                            <p>아이디 :</p>
                            <input id="sign-up-id" type='text' placeholder="6 ~ 20자 영문,숫자로 입력" onBlur={checkid} />
                            <button style={{ marginLeft: '10px' }} onClick={double_check}>중복확인</button>
                        </div>

                        <div className={cs("flex", 'sign-pw')}>
                            <p>비밀번호 : </p>
                            <input id="sign-up-pw" type='password' placeholder="8 ~ 10자 영문,숫자로 입력" onBlur={checkPassword} />
                            <i class="fa-solid fa-check"></i>
                            <i class="fa-solid fa-xmark"></i>
                        </div>
                        <div className={cs("flex")}>
                            <p>비밀번호 확인 :</p>
                            <input id="pw-check" type='password' onKeyUp={checkpw} />
                            <i class="fa-solid fa-check"></i>
                        </div>

                        <div className={cs("flex")}>
                            <p>휴대폰 번호 :</p>
                            <input id="sign-up-phone" type='text' placeholder=" - 을 포함한 번호 입력 " onBlur={checkPhonenumber} />
                            <i class="fa-solid fa-check"></i>
                        </div>

                        <div className={cs("flex")}>
                            <p>이메일 :</p>
                            <input id="sign-up-em" type='text' onBlur={checkEmail} />
                            <i class="fa-solid fa-check"></i>
                        </div>
                        <button className={cs("sign-up-btn")} onClick={sign_up}>회원가입</button>
                        {/* </form> */}


                    </div>

                </div>



            </div>
            {/* <div className="address_search" >address */}



        </>
    )
}
export default Login