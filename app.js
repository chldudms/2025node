const express = require("express");
const path = require("path");  // path 모듈 추가

const app = express();

app.set('view engine','ejs');
//dirname:현재 파일이 속한 절대 경로
//path.join을 사용하면 운영체제와 상관없이 경로 구분자(/,\)을 알아서 잡아준다. 
//절대경로와 타입경로를 연결해준다.
app.set('views', path.join(__dirname,'views'));  

console.log(path.join(__dirname,'views'));

