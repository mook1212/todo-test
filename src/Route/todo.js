import { createContext, useState, useEffect } from "react"
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom'
import classNames from 'classnames/bind'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import Swal from 'sweetalert2'
import axios from 'axios'
import style from './todo.module.css'

const cs = classNames.bind(style);

function Todo() {

    const [value, onChange] = useState(new Date());

    let [list, setList] = useState()
    let [none, setNone] = useState('none')
    let [block, setBlock] = useState('block')
    let [flex, setFlex] = useState('flex')

    let [filter,setFilter] = useState()
    useEffect(() => {
        axios.get('http://localhost:8000/list-confirm')
            .then(res => {
                console.log(res);
                const DBfilter = res.data.filter((data) => {
                    return data.title === moment(value).format("YYYY년 MM월 DD일")
                })
                setFilter(DBfilter)
                console.log(filter);
            })
            .catch(() => {
                console.log("실패");
            });
    }, [none])

    function list_confirm () {
        
    }

    // function list_add() {
    //     axios.post('http://localhost:8000/todolist', {
    //         title: moment(value).format("YYYY년 MM월 DD일"),
    //         name: val
    //     })
    //         .then(function (res) {
    //             console.log(res);
    //         })
    //         .catch(() => {
    //             console.log("실패");
    //         });
    // }

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

                        <div className={cs("add")}>

                            <div className={cs("add-input", `${none}`)}>
                                <input id="add-input" type='text' />
                                <button onClick={() => {
                                    let val = document.getElementById('add-input').value
                                    if (val == '') {
                                        Swal.fire('일정을 입력 해주세요.')
                                    } else if (val != '') {
                                        Swal.fire('일정이 추가 되었습니다.')

                                        setBlock('block')
                                        setNone('none')
                                    }
                                }}>생성</button>
                            </div>

                            <button className={cs("add-btn", `${block}`)} onClick={() => {
                                setBlock('none')
                                setNone('block')
                            }}><i class="fa-solid fa-plus"></i></button>
                            <button className={cs("close-btn", `${none}`)} onClick={() => {
                                setBlock('block')
                                setNone('none')
                            }}><i class="fa-solid fa-xmark"></i></button>
                        </div>
                    </div>

                </div>

                <div className={cs("container2")}>
                    <div className={cs("todo-calendar")}>
                        <Calendar className={cs('calendar')} onChange={onChange} value={value} />
                    </div>

                    <div className={cs("memo")}>
                        <div className={cs("none-memo")}>
                            <h1>현재 선택된 항목이 없습니다.</h1>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default Todo