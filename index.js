/// Callbacks

// const loadScript = (src, callback) => {
// 	let script = document.createElement('script');
// 	script.src = src;
// 	script.onload = () => callback(null, script);
// 	script.onerror = () => callback(new Error(`Не удалось загрузить скрипт ${src}`));
// 	document.body.append(script);
// }

// loadScript('./testScript.js', (error, script) => {
// 	if (error) {

// 	} else {
// 		say()
// 	}

// });

/// Promises

// let promise = new Promise((resolve, reject) => {

// 	setTimeout(() => {
// 		reject(new Error("done"));
// 	}, 3000);
// });

// promise
// 	.finally(() => alert('Promise finish...'))
// 	.then(result => console.log(result))
// 	.catch(error => console.log(error));

/// Rewrite <loadScript> with promise

// const loadScript = (src) => {
// 	return new Promise((resolve, reject) => {
// 		let script = document.createElement('script');
// 		script.src = src;

// 		script.onload = () => resolve(script);
// 		script.onerror = () => reject(new Error(`Не удалось загрузить скрипт ${src}`));

// 		document.body.append(script);
// 	});
// }

// let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

// promise.then(script => alert('Еще один обработчик...'))

///

// const delay = ms => {
// 	return new Promise(resolve => setTimeout(() => resolve(), ms));
// };

// delay(3000).then(() => alert('выполнилось через 3 секунды'));

/// Promise Chaining

// new Promise(function (resolve, reject) {

// 	setTimeout(() => resolve(1), 1000); // (*)

// }).then(function (result) { // (**)

// 	alert(result); // 1
// 	return result * 2;

// }).then(function (result) { // (***)

// 	alert(result); // 2
// 	return result * 2;

// }).then(function (result) {

// 	alert(result); // 4
// 	return result * 2;
// });

///

const loadScript = (src) => {
	return new Promise((resolve, reject) => {
		let script = document.createElement('script');
		script.src = src;

		script.onload = () => resolve(script);
		script.onerror = () => reject(new Error(`Не удалось загрузить скрипт ${src}`));

		document.body.append(script);
	});
}

loadScript("./promise-chaining/one.js")
	.then(script => loadScript("./promise-chaining/two.js"))
	.then(script => loadScript("./promise-chaining/three.js"))
	.then(script => {
		one();
		two();
		three();
	});

/// Thenable objects

// class Thenable {
// 	constructor(num) {
// 		this.num = num;
// 	}

// 	then(resolve, reject) {
// 		alert(resolve);

// 		setTimeout(() => resolve(this.num * 2), 1000);
// 	}
// }

// new Promise(resolve => resolve(1))
// 	.then(result => {
// 		return new Thenable(result);
// 	})
// 	.then(alert);

/// Fetch

let promise = fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
	.then(response => {
		console.log(response);
	});