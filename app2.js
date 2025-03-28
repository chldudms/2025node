const express = require("express");
const path = require("path");  // path 모듈 추가
const mysql = require('mysql2');
const { createConnection } = require("net");
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

travelList = ['뉴욕', '파리','서울','도쿄'];

app.set('view engine','ejs');
//dirname:현재 파일이 속한 절대 경로
//path.join을 사용하면 운영체제와 상관없이 경로 구분자(/,\)을 알아서 잡아준다. 

app.set('views', path.join(__dirname,'views'));

db.connect(err=> {
    if(err){
        console.error('MySQL 연결 실패',err)
    }
    console.log('mysql에 연결되었습니다.  ')
})

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/travel',(req,res)=>{
    res.render('travel',{travelList});
})

app.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});

