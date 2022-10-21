const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(express.urlencoded({ extended: true }))
const path = require('path');

app.use(express.json());
var cors = require('cors');
const { count } = require('console');
app.use(cors());

const MongoClient = require('mongodb').MongoClient;

// Session 방식 로그인
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : '비밀코드', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session()); 


var db;

MongoClient.connect('mongodb+srv://skdo223:apsode1@cluster0.udjmfja.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true }, function (에러, client) {
    if (에러) return console.log(에러)
    db = client.db('todoapp');

    app.listen(8000, function () {
        console.log('listening on 8080')
    });
});

// DB에 일정 조회
app.get('/list-confirm', (req, res) => {
    db.collection('todolist').find().toArray((에러, 결과) => {
        res.send(결과)
    })
    console.log('DB조회 완료');
})

// DB에 일정 추가
app.post('/todolist', (req, res) => {
    db.collection('counter').findOne({ name: '게시물갯수' }, function (에러, 결과) {
        let count = 결과.totalpost // DB의 총 게시물갯수 가져오기

        db.collection('todolist').insertOne({ _id: count + 1, title: req.body.title, name: req.body.name }, function (에러, 결과) {
            console.log('일정 저장완료');
            db.collection('counter').updateOne({ name: '게시물갯수' }, { $inc: { totalpost: 1 } }, (에러, 결과) => {
                res.status(200).send({ message: '성공했음' });
            })
        })
        
    })
})

// DB정보 수정,추가
app.put('/list-update', (req, res) => {
    console.log(req.body);
    db.collection('todolist').updateOne({ _id: req.body.id }, { $set: { memo: req.body.memo } }, (에러, 결과) => {
        res.status(200).send({ message: '수정 성공했음' });
    })
    console.log('수정완료');
})


// DB정보 삭제
app.delete('/list-delete', (req, res) => {
    console.log(req.body);
	// req.body._id = parseInt(req.body._id)
	db.collection('todolist').deleteOne(req.body, (에러, 결과) => {
		console.log('삭제완료');
		res.status(200).send({ message: '성공했음' });
	})
})