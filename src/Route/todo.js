import { createContext, useState, useEffect } from "react"
import { Route, Routes, Link, useNavigate, Outlet } from 'react-router-dom'
import classNames from 'classnames/bind'
import Calendar from 'react-calendar';
import moment from 'moment';
import Swal from 'sweetalert2'
import axios from 'axios'
import 'react-calendar/dist/Calendar.css';
import style from './todo.module.css'
import '../App.css'

const cs = classNames.bind(style);

function Todo() {

    const [value, onChange] = useState(new Date());

    let [none, setNone] = useState('none')
    let [block, setBlock] = useState('block')
    let [flex, setFlex] = useState('flex')
    let [textbox, setTextbox] = useState('none')
    let [listmemo, setListmemo] = useState('none')
    let [memoData, setMemoData] = useState([])

    let [re, setRe] = useState(1)




    let [filter, setFilter] = useState([]) // 현재 날짜와 맞는 데이터

    let [list, setList] = useState() // 현재 날짜와 맞는 name 데이터

    let [DBdate, setDBDate] = useState([]) // DB에 있는 모든 title 데이터 


    // DB에 일정 데이터 조회

    useEffect(() => {
        axios.get('http://localhost:8000/list-confirm')

            .then(res => {

                // 현재 날짜와 맞는 title 데이터 조회
                const DBfilter = res.data.filter((data) => {
                    return data.title === moment(value).format("YYYY년 MM월 DD일")
                })
                let list = DBfilter.map(a => a.name)
                setFilter(DBfilter)
                setList(list)
                // console.log(DBfilter);
                // console.log(list);

                // 모든 title 데이터 조회
                let day = res.data.map(a => a.title);
                setDBDate(day)
            })

            .catch(() => {
                console.log("실패");
            });
    }, [moment(value).format("YYYY년 MM월 DD일"), block, re])

    console.log(filter);


    function list_add() {
        let val = document.getElementById('add-input').value
        let id = filter.map(a => a.name)
        axios.post('http://localhost:8000/todolist', {
            title: moment(value).format("YYYY년 MM월 DD일"),
            name: val
        })
            .then(function (res) {
                console.log(res);
                setBlock('block')
                setNone('none')
            })
            .catch(() => {
                console.log("실패");
            });
    }

    useEffect(() => {
        setMemoData([])
    }, filter)


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
                            {
                                filter != ''
                                    ?
                                    filter.map((a, i) => {
                                        let list_name = filter[i].name
                                        let id = filter[i]._id
                                        let text_input_id = 'text-input' + i
                                        let memobox = 'memo' + i

                                        return (
                                            <>
                                                <div className={cs("main-list")}>
                                                    <p data-id={id} onClick={(e) => {
                                                        setMemoData(a)
                                                    }}>{i + 1}. {list_name}</p>

                                                    <div className={cs("list-icon")}>

                                                        <i class="fa-solid fa-pen" onClick={() => {
                                                            setRe(re + 1)
                                                            document.querySelector(`.text-container${i}`).style.display = 'block'

                                                            document.getElementById(text_input_id).value = list_name // 누른 리스트 이름이
                                                            console.log(list_name);
                                                            // console.log(text_input_id);

                                                        }}></i>

                                                        {/* 휴지통  */}
                                                        <i class="fa-solid fa-trash" onClick={() => {
                                                            axios.delete('http://localhost:8000/list-delete', {
                                                                data: { _id: id }
                                                            })
                                                                .then(function (res) {
                                                                    setRe(re + 1)
                                                                })
                                                                .catch(() => {
                                                                    console.log("실패");
                                                                });
                                                        }}></i>
                                                    </div>
                                                </div>


                                                {/* 일정 텍스트 */}

                                                {/* <div className={cs('cc',`text-container${i}`, 'none')}>
                                                    <div className={cs('text-box')}>
                                    
                                                        <textarea id={text_id} className={cs('list-text')} placeholder='내용을 입력 해주세요.'></textarea>

                                                        <div className={cs("text-btn")}>
                                                        <button onClick={(e) => {
                                                            let memo = document.getElementById(text_id).value
                                                            axios.put('http://localhost:8000/list-update', {
                                                                id: id,
                                                                memo: memo
                                                            })
                                                                .then(function (res) {
                                                                    console.log(res);
                                                                    setRe(re + 1)

                                                                })
                                                                .catch(() => {
                                                                    console.log("실패");
                                                                });
                                                            document.querySelector(`.text-container${i}`).style.display = 'none'
                                                        }}>확인</button>
                                                        <button onClick={()=> {
                                                            console.log(document.querySelector(`.text-container${i}`).className);
                                                            document.querySelector(`.text-container${i}`).style.display = 'none'
                                                        }}>취소</button>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                {/* <input type='text'></input> */}

                                                <div className={cs(`text-container${i}`, 'text-container')}>
                                                    <div className={cs("text-modal")}>
                                                        <p>{list_name}</p>
                                                        <div className={cs("text-box")}>
                                                            <input id={text_input_id} type='text' />
                                                            <textarea id={memobox} placeholder='내용을 입력 해주세요.'></textarea>
                                                        </div>

                                                        <div className={cs("text-btn")}>
                                                            <button onClick={() => {
                                                                let memo = document.getElementById(memobox).value
                                                                axios.put('http://localhost:8000/list-update', {
                                                                    id: id,
                                                                    memo: memo
                                                                })
                                                                    .then(function (res) {
                                                                        console.log(res);
                                                                        setRe(re + 1)

                                                                    })
                                                                    .catch(() => {
                                                                        console.log("실패");
                                                                    });
                                                                document.querySelector(`.text-container${i}`).style.display = 'none'
                                                            }}>확인</button>
                                                            <button onClick={() => {
                                                                document.querySelector(`.text-container${i}`).style.display = 'none'
                                                            }}>취소</button>
                                                        </div>
                                                    </div>
                                                </div>


                                            </>
                                        )
                                    })
                                    : ''
                            }
                        </div>


                        {/* 일정 추가 */}

                        <div className={cs("add")}>

                            <div className={cs("add-input", `${none}`)}>
                                <input id="add-input" type='text' />
                                <button onClick={() => {
                                    let val = document.getElementById('add-input').value
                                    if (val == '') {
                                        Swal.fire('일정을 입력 해주세요.')
                                    } else if (val != '') {
                                        list_add()
                                        Swal.fire('일정이 추가 되었습니다.')

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

                    {/* 달력 */}

                    <div className={cs("todo-calendar")}>
                        <Calendar className={cs('calendar')} onChange={onChange} value={value}
                            tileContent={({ date, view }) => {
                                if (DBdate.find((x) => x === moment(date).format("YYYY년 MM월 DD일"))) {
                                    return (
                                        <>
                                            <div className={cs('mark')}>
                                                <div className={cs("dot")}></div>
                                            </div>
                                        </>
                                    );
                                }
                            }} />
                    </div>

                    {/* 일정 메모 */}

                    <div className={cs("memo")}>
                        {
                            memoData != ''
                                ?
                                <div className={cs("none-memo")}>
                                    <h1>{memoData.title}</h1>
                                    <div className={cs("memo-list")}>
                                        <p>{memoData.name}<br /></p>
                                        {
                                        // memoData.memo != 
                                        memoData.memo != undefined
                                        ?
                                        memoData.memo.split('\n').map((line) => {
                                            return (
                                                <span>
                                                    {line}
                                                    <br />
                                                </span>
                                            )
                                        })
                                        : null
                                    } 
                                    </div>

                                </div>
                                : <h1 style={{ textAlign: "center", marginTop: "20px" }}>현재 선택된 항목이 없습니다.</h1>
                        }

                    </div>

                </div>

            </div>
        </>
    )
}

export default Todo