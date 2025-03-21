const express = require('express');
const bbRouter = require('./routes/bigbang'); // 라우터 가져오기

const app = express();

app.use(express.json()); // JSON 파싱 미들웨어

app.use('/bigbang', bbRouter); // /swag 경로에 라우터 적용  
//use에 의미 : get, post다 됨 -

app.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
