// // http 모듈을 가져옵니다.
// const http = require('http');

// // 서버를 생성합니다.
// const server = http.createServer((req, res) => {
//   // HTTP 응답 헤더 설정
//   res.writeHead(200, { 'Content-Type': 'text/plain' });

//   // 응답 본문에 'Hello, World!'를 보냅니다.
//   res.end('Hello, World!\n');
// });

// // 서버가 포트 3000에서 요청을 대기합니다.
// server.listen(3000, () => {
//   console.log('서버가 http://localhost:3000에서 실행 중입니다.');
// });


// Express 모듈을 가져옵니다.
const express = require('express');

// Express 애플리케이션을 생성합니다.
const app = express();

// 루트 경로('/')에 GET 요청이 왔을 때 'Hello, World!' 응답을 보냅니다.
// app.get('/', (req, res) => {
//     res.send('bye, world!\n');
// });


app.get('/swag', (req, res) => {
    res.send('get, swag!\n');
});

app.post('/swag', (req, res) => {
    res.send('post swag!\n');
}); 

// 서버가 포트 3000에서 요청을 대기합니다.
app.listen(3000, () => {
    console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});