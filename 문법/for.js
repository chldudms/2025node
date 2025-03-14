const letter = ['a','b','c','d']

for(let i=0;i<letter.length;i++){
    console.log(letter[i])
}
//arrow
letter.forEach((f)=>{ console.log(f)})

for(const i of letter){
    console.log(i)
}