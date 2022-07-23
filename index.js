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

// const loadScript = (src) => {
// 	return new Promise((resolve, reject) => {
// 		let script = document.createElement('script');
// 		script.src = src;

// 		script.onload = () => resolve(script);
// 		script.onerror = () => reject(new Error(`Не удалось загрузить скрипт ${src}`));

// 		document.body.append(script);
// 	});
// }

// loadScript("./promise-chaining/one.js")
// 	.then(script => loadScript("./promise-chaining/two.js"))
// 	.then(script => loadScript("./promise-chaining/three.js"))
// 	.then(script => {
// 		one();
// 		two();
// 		three();
// 	});

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

// let promise = fetch("./promise-chaining/user.json")
//		.then(response => response.json())
// 	.then(user => fetch(`https://api.github.com/users/${user.name}`))
// 	.then(response => response.json())
// 	.then(githubUser => new Promise((resolve, reject) => {
// 		let img = document.createElement('img');
// 		img.src = githubUser.avatar_url;
// 		img.classList.add("promise-avatar");
// 		document.body.append(img);

// 		setTimeout(() => {
// 			img.remove();
// 			resolve(githubUser);
// 		}, 3000);

// 	}))
// 	.then(githubUser => alert(`Закончили показ ${githubUser.name}`))

/// Fetching Github Avatar

// function loadJson(url) {
// 	return fetch(url).then(response => response.json());
// }

// function loadGithubUser(name) {
// 	return fetch(`https://api.github.com/users/${name}`)
// 		.then(response => response.json());
// }

// function showAvatar(githubUser) {
// 	return new Promise((resolve, reject) => {
// 		let img = document.createElement('img');
// 		img.src = githubUser.avatar_url;
// 		img.classList.add("promise-avatar");
// 		document.body.append(img);

// 		setTimeout(() => {
// 			img.remove();
// 			resolve(githubUser);
// 		}, 3000);
// 	});
// }

// loadJson("./promise-chaining/user.json")
// 	.then(user => loadGithubUser(user.name))
// 	.then(showAvatar)
// 	.then(githubUser => alert(`Avatar: -> ${githubUser.name} <- showing ended`)
// 	);

/// Promises: Catch errors

// fetch('https://wrong-link.com')
// 	.then(response => response.json())
// 	.catch(err => console.log(err))

/// Throwing errors

// new Promise((resolve, reject) => {
// 	throw new Error("Error!");
// }).catch(function (error) {
// 	alert("Error handled, continue to work");
// }).then(() => alert("Jump to next '.then'"));

///

// new Promise((resolve, reject) => {
// 	throw new Error("Error!");
// }).catch(function (error) {

// 	if (error instanceof URIError) {
// handle error...
// 	} else {
// 		alert("Can't handle error");
// 		throw error;
// 	}

// }).then(function () {
// }).catch(error => {

// 	alert(`Unknown error: ${error}`);

// });

/// Unhandled error

// window.addEventListener('unhandledrejection', event => {
// 	alert(event.promise); // [object Promise]
// 	alert(event.reason);
// });

// new Promise(function () {
// 	throw new Error("Error!");
// });

/// Promise: API
/// Promise.all(promises) – ожидает выполнения всех промисов и возвращает массив с результатами. Если любой из указанных промисов вернёт ошибку, то результатом работы Promise.all будет эта ошибка, результаты остальных промисов будут игнорироваться.

// Promise.all([
// 	new Promise(resolve => setTimeout(() => resolve(1), 1000)),
// 	new Promise(resolve => setTimeout(() => resolve(2), 3000)),
// 	new Promise(resolve => setTimeout(() => resolve(3), 2000)),
// ]).then(console.log);

///

// let names = ['iliakan', 'remy', 'jeresig'];

// let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

// Promise.all(requests)
// 	.then(responses => {
// 		for (const response of responses) {
// 			console.log(`${response.url}: ${response.status}`);
// 		}

// 		return responses;
// 	})
// 	.then(responses => Promise.all(responses.map(r => r.json())))
// 	.then(users => users.forEach(user => console.log(user.name)));

/// Promise.allSettled(promises) (добавлен недавно) – ждёт, пока все промисы завершатся и возвращает их результаты в виде массива с объектами, у каждого объекта два свойства:
/// * state: "fulfilled", если выполнен успешно или "rejected", если ошибка,
/// * value – результат, если успешно или reason – ошибка, если нет.

// Promise.all([
// 	fetch('./index.html'),
// 	fetch('./promise-chaining/user.json')
// ]).then(response => response.forEach(request => console.log(request.url)));

///

// let urls = [
// 	'https://api.github.com/users/iliakan',
// 	'https://api.github.com/users/remy',
// 	'https://no-such-url'
// ];

// Promise.allSettled(urls.map(url => fetch(url)))
// 	.then(result => {
// 		result.forEach((result, num) => {
// 			if (result.status === 'fulfilled') {
// 				console.log(`${urls[num]}: ${result.value.status}`);
// 			} else if (result.status == 'rejected') {
// 				console.log(`${urls[num]}: ${result.reason}`);
// 			}
// 		});
// 	});

/// Promise.race(promises) – ожидает первый выполненный промис, который становится его результатом, остальные игнорируются.

// Promise.race([
// 	new Promise((resolve, reject) => setTimeout(() => resolve(1), 3000)),
// 	new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ошибка!")), 2000)),
// 	new Promise((resolve, reject) => setTimeout(() => resolve(3), 1000))
// ]).then(console.log);

/// Promisification

function loadScript(src, callback) {
	let script = document.createElement('script');
	script.src = src;

	script.onload = () => callback(null, script);
	script.onerror = () => callback(new Error(`Script error ${src}`));

	document.head.append(script);
}

// -> to Promise

let loadScriptPromise = src => {
	return new Promise((resolve, reject) => {
		loadScript(src, (err, script) => {
			if (err) reject(err)
			else resolve(script);
		});
	});
};

loadScriptPromise('./promise-chaining/one.js').then();