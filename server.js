const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(express.urlencoded({extended: true})) 
const path = require('path');

app.use(express.json());
var cors = require('cors');
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
app.get('/list-confirm', (req,res)=> {
    db.collection('todolist').find().toArray((에러, 결과) => {
        res.send(결과)
    })
    console.log('장바구니 조회 완료');
})

// DB에 일정 추가
app.post('/todolist', (req,res)=> {
    db.collection('todolist').insertOne({title : req.body.title, name: req.body.name}, function(에러,결과) {
        console.log('저장완료');
    })
    res.send('전송완료')
    console.log(req.body);
})