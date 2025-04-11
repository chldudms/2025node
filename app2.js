const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const router = express.Router();
const travel = require('./routes/travel')
const home = require('./routes/home')


const port = 3001;

dotenv.config();
const app = express();


// // .env로 민감한 데이터를 이동
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(travel);
app.use(home)


app.set('view engine', 'ejs');
// __dirname : 현재 파일이 속한 절대경로
// path.join을 사용하면 운영체제에 맞추어 경로 구분자(/, \)를 알아서 정해준다
app.set('views', path.join(__dirname, 'views'));

db.connect(err=> {
  if(err) {
    console.err('MySQL 연결 실패:', err);
    return;
  }
  console.log('MySQL에 연결되었습니다.');
});



// use:모든 method에 대해, 경로가 없으면?: 모든 경로에 대해
app.use((req, res)=> {
  res.status(404).send('사공사 낫파운드');
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});