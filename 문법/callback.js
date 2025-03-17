function func(callback) {
	callback();
    console.log("함수다")

}
function callback() {
	console.log("callback이다");
}

func(callback);


