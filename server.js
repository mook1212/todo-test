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
    console.log('장바구니 조회 완료');
})

// DB에 일정 추가
app.post('/todolist', (req, res) => {
    db.collection('counter').findOne({ name: '게시물갯수' }, function (에러, 결과) {
        let count = 결과.totalpost // DB의 총 게시물갯수 가져오기

        db.collection('todolist').insertOne({ _id: count + 1, title: req.body.title, name: req.body.name }, function (에러, 결과) {
            console.log('저장완료');
        })
        res.send('전송완료')
        console.log(req.body);

        db.collection('counter').updateOne({ name : '게시물갯수' }, { $set: { totalpost : count+1 } }, (에러, 결과) => {
            res.status(200).send({ message: '성공했음' });
        })
    })
})

// DB정보 수정,추가
app.put('/list-update', (req, res) => {
    console.log(req.body);
    db.collection('todolist').updateOne({ _id: req.body.id }, { $set: { memo : req.body.memo } }, (에러, 결과) => {
        res.status(200).send({ message: '성공했음' });
    })
    console.log('수정완료');
})
