const express = require("express");
const router = express.Router();

router.get('/',(req,res)=> 
    res.send("안녕하세요 bingbang입니다.")
 )

 router.get('/:song',(req,res)=> {
    res.send("오늘 들려드릴 곡은: "+req.params.song);
 })

 
router.post('/',(req,res)=>{
    res.send(req.body);
})

module.exports = router;
