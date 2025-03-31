require('dotenv').config(); // 환경 변수 로드

const express = require("express");
const path = require("path");
const mysql = require('mysql2');

const app = express();

// 🚀 `createPool` 사용해서 MySQL 연결 유지
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ✅ MySQL 연결 확인
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ MySQL 연결 실패:', err);
        process.exit(1);  // 서버 종료
    }
    console.log('✅ MySQL에 연결되었습니다.');
    connection.release();  // 연결 반환
});

// 🚀 홈 페이지
app.get('/', (req, res) => {
    res.render('home');
});

// 🚀 여행 리스트 조회 API
app.get('/travel', (req, res) => {
    const query = 'SELECT id, name FROM travellist';

    db.query(query, (err, results) => {
        if (err) {
            console.error('❌ 데이터베이스 쿼리 실패:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.render('travel', { travelList: results });
    });
});

app.get('/travel/:id',(req,res)=>{
    const travelID= req.params.id;
    const query = 'SELECT * FROM travellist WHERE id =?'
    db.query(query, [travelID],(err, results)=>{
        if(err){
            console.error('DB 쿼리 실패',err)
            res.status(500).send('내부 서버 에러');
            return;
        }
        if(results.legnth===0){
            res.status(400).send('여행지를 찾을 수 없습니당.')
        }
        const travel = results[0];
        res.render('travelDetail',{travel});
    })
})

// ✅ 서버 실행
