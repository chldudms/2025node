const express = require('express');
const router = express.Router();
const mysql = require('mysql2'); // db 연결 모듈 따로 뺀 경우
const dotenv = require('dotenv');

dotenv.config(); 
// .env로 민감한 데이터를 이동
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

//  router.get('/', (req, res) => {
//     res.render('home');
//   });

  router.get('/travel', (req, res) => {
    const _query = 'SELECT id, name FROM travellist';
    db.query(_query, (err, results) => {
      if (err) {
        console.error('데이터베이스 쿼리 실패');
        res.status(500).send('Internal Server Error');
        return;
      }
      const travelList = results;
      res.render('travel', { travelList });
    });
  });

  router.get('/travel/:id', (req, res) =>{
    const travelID = req.params.id;
    const _query = 'SELECT * FROM travellist WHERE id = ?';
    db.query(_query, [travelID], (err, results)=>{
      if(err) {
        console.error('DB 쿼리 실패', err);
        res.status(500).send('내부 서버 에러');
        return;
      }
      if(results.length ===0) {
        res.status(404).send('여행지를 찾을 수 없습니다');
        return;
      }
      const travel = results[0];
      res.render('travelDetail', {travel});
    });
  })

  router.post('/travel', (req, res) => {
    const {name} = req.body;
    const _query = 'INSERT INTO travellist (name) VALUES (?)';
    db.query(_query, [name], (err, results) => {
      if (err) {
        console.error('데이터베이스 쿼리 실패');
        res.status(500).send('Internal Server Error');
        return;
      }
      res.redirect('/travel');
    });
  });
  
  router.put('/travel/:id', (req, res) =>{
    const travelID = req.params.id;
    const {name} = req.body;
    const _query = 'UPDATE travellist SET name = ? WHERE id = ?';
    db.query(_query, [name, travelID], (err, results)=>{
      if(err) {
        console.error('DB 쿼리 실패', err);
        res.status(500).send('내부 서버 에러');
        return;
      }
      if(results.length ===0) {
        res.status(404).send('여행지를 찾을 수 없습니다');
        return;
      }
      res.render('updateSuccess');
    });
  })
  
  router.delete('/travel/:id', (req, res) =>{
    const travelID = req.params.id;
    const _query = 'DELETE FROM travellist WHERE id = ?';
    db.query(_query, [travelID], (err, results)=>{
      if(err) {
        console.error('DB 쿼리 실패', err);
        res.status(500).send('내부 서버 에러');
        return;
      }
      if(results.length ===0) {
        res.status(404).send('여행지를 찾을 수 없습니다');
        return;
      }
      res.render('deleteSuccess');
    });
  })
  
  router.get('/travel/:id/edit', (req, res) =>{
    const travelID = req.params.id;
    const _query = 'SELECT * FROM travellist WHERE id = ?';
    db.query(_query, [travelID], (err, results)=>{
      if(err) {
        console.error('DB 쿼리 실패', err);
        res.status(500).send('내부 서버 에러');
        return;
      }
      if(results.length ===0) {
        res.status(404).send('여행지를 찾을 수 없습니다');
        return;
      }
      const travel = results[0];
      res.render('editTravel', {travel});
    });
  })
  
  router.get('/travel/add', (req, res)=>{
    res.render('addTravel');
  });
  
module.exports = router;