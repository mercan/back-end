const fetch = require('node-fetch');


/*
fetch('http://localhost:3000/create-question-user', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
	  'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
	},
	body: JSON.stringify({ 
		eventCode: 'D695V63C', 
		question: 'Dolar daha ne kadar artabilir ? (MERAK ETTİM)'
	}),
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/


/*
fetch('http://localhost:3000/create-question-anonymous', {
	method: 'POST',
	headers: {
	 	'Content-Type': 'application/json; charset=utf-8',
	},
	body: JSON.stringify({ 
		eventCode: 'D695V63C', 
		question: 'DENEME DENEME DENEME'
	}),
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/create_event', {
	method: 'POST',
	headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjMxZTBkMzc4NTk3ZDA4OGMwMmZkMWUiLCJuYW1lIjoixLBicmFoaW0gQ2FuIE1lcmNhbiIsInBpY3R1cmUiOiJodHRwczovL3d3dy5ib29rc2llLmNvbS9maWxlcy9wcm9maWxlcy8yMi9tci1hbm9ueW1vdXMucG5nIiwiaWF0IjoxNTk3NDkwOTc2LCJleHAiOjE1OTg3ODY5NzZ9.qSZRISEEP2lBZ-5OTxI7tLzx6NU0ejwQ2l_59qQxyUs'
  },
	body: JSON.stringify({
 		name: 'Test Event', 
 		type: 'Software'
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/getQuestion?eventCode=D695V63C&skip=0', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
	}
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();

	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data); 
});
*/


/*
fetch('http://localhost:3000/like-question-user', {
	method: 'POST',
	headers: {
    'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
  },
	body: JSON.stringify({
		questionID: '5f09104e35ebb71f606ce0f4'
	}),
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/


/*
fetch('http://localhost:3000/like-question-anonymous', {
	method: 'POST',
	headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
	body: JSON.stringify({
		questionID: '5ee76114a1788c0017514dfd'
	}),
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/signup', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	},
	body: JSON.stringify({
		name: 'İbrahim Can Mercan',
		email: 'deneme@gmail.com',
		username: 'Deneme',
		password: 'mercan123456',
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/login', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	},
	body: JSON.stringify({
 		username: 'Mercan',
		//email: 'ultuma00@gmail.com',
		password: '123456789'
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/


fetch('http://localhost:3000/two_factor_verify?username=Mercan&code=416121', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	}
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});


/*
fetch('http://localhost:3000/creator-delete-question', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
	},
	body: JSON.stringify({
		questionID: '5ee76114a1788c0017514dfd'
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/user-delete-question', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
	},
	body: JSON.stringify({
		questionID: '5f09104c35ebb71f606ce0f3'
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/anonymous-delete-question', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	},
	body: JSON.stringify({
		questionID: '5eee1d768609d704441494d9'
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/feature-update-q?question=true&reply=false&loginQuestion=true&questionLimit=1', {
	method: 'POST',
	headers: {
		'Accept': '* /*',
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
	},
	body: JSON.stringify({
		eventCode: 'D695V63C'
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/event-banned-add', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
	},
	body: JSON.stringify({
		eventCode: 'D695V63C',
		userID: '5edfea5d7366140017016565'
		// questionID: id
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/all-banned-add', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
	},
	body: JSON.stringify({
		//questionID: '5eee1d768609d704441494d9'
		userID: '5ee157a9f47cfa001753cb42'
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/change_name', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
	},
	body: JSON.stringify({
		name: 'İbrahim Can'
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/change_email', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
	},
	body: JSON.stringify({
		email: 'mrcnn@gmail.com'
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/change_password', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
	},
	body: JSON.stringify({
		newPassword: 'yeni password',
		password: 'eski password'
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/add_join_event', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZWUyNThhYTA4ZWUzMTA3ZWM0ZGQxN2EiLCJuYW1lIjoiVGVzdCBOYW1lIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTM0Nzc1MDksImV4cCI6MTU5NjA2OTUwOX0.XrtswTDUHoopQ1N1qe9RNs15eAOf_bG3QvB83zguDIg'
	},
	body: JSON.stringify({
		eventCode: 'D695V63C'
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
		
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/user_profile_info', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiYTNhZTFhZTBiNjAwMTc0ODk3M2QiLCJuYW1lIjoiw5xjcmV0c2l6IEt1cnMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzEyNTAxNzcxMjEzNTc1NzQxNDkvX3hvbmRGbW1fbm9ybWFsLmpwZyIsImlhdCI6MTU5NDU5ODY2NiwiZXhwIjoxNTk3MTkwNjY2fQ.FPnkBj7qmkXoZUJPNIoRNWzDVHMteJEyZDGULp0iF9c'
	},
	body: JSON.stringify({
		username: 'Mercan'
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/token-verify', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
	}
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('https://soruio.herokuapp.com/logout', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	}
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/all-events', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json; charset=utf-8'
	}
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/event-banned-delete', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
	},
	body: JSON.stringify({
		eventCode: 'D695V63C',
		userID: '5edfea5d7366140017016565'
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/username-suggestion', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZWUxNTdhOWY0N2NmYTAwMTc1M2NiNDIiLCJuYW1lIjoiw5xjcmV0c2l6IEt1cnMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9wYnMudHdpbWcuY29tL3Byb2ZpbGVfaW1hZ2VzLzEyNTAxNzcxMjEzNTc1NzQxNDkvX3hvbmRGbW1fbm9ybWFsLmpwZyIsImlhdCI6MTU5MTgyNjQxNCwiZXhwIjoxNTk0NDE4NDE0fQ.LEXNxKDE0BtPJUCDv9fCpfbwvUH8XoCVvtn5f0fID6Q'
	}
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/change_username', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZWUyNThhYTA4ZWUzMTA3ZWM0ZGQxN2EiLCJuYW1lIjoiVGVzdCBOYW1lIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTM0Nzc1MDksImV4cCI6MTU5NjA2OTUwOX0.XrtswTDUHoopQ1N1qe9RNs15eAOf_bG3QvB83zguDIg'
	},
	body: JSON.stringify({
		username: 'UcretsizUdemy'
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/notification-add', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
	},
	body: JSON.stringify({
		eventCode: 'D695V63C'
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/notification-delete', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
	},
	body: JSON.stringify({
		//notificationID: '5ee36d9ab8702c0744a21b2e'
		allDeleteNotification: true

	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/username-search?username=M', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
	}
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/event-search?eventCode=D695V63C', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
	}
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();

	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
		
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/get_blocks?skip=0', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
	}
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/add_block', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
	},
	body: JSON.stringify({
		userID: '5f0ba3c71ae0b60017489740',
		// showQuestions: false, // default: false
		// infoMessage: 'Deneme Deneme' // default: undefined
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/delete_block', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
	},
	body: JSON.stringify({
		unBlockUserID: '5f0ba3c71ae0b60017489740'
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/follow', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjMxZTBkMzc4NTk3ZDA4OGMwMmZkMWUiLCJuYW1lIjoixLBicmFoaW0gQ2FuIE1lcmNhbiIsInBpY3R1cmUiOiJodHRwczovL3d3dy5ib29rc2llLmNvbS9maWxlcy9wcm9maWxlcy8yMi9tci1hbm9ueW1vdXMucG5nIiwiaWF0IjoxNTk3NDkwOTc2LCJleHAiOjE1OTg3ODY5NzZ9.qSZRISEEP2lBZ-5OTxI7tLzx6NU0ejwQ2l_59qQxyUs'
	},
	body: JSON.stringify({
		userID: '5f2fd6a4b8b13b1ecc8a473b', // Takip edeceğin ID &  Takip etmeyi bırakacağın kişi ID
		type: 'Follow' // Unfollow & Follow
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/user_follower_list?username=Caldwell', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjMxZTBkMzc4NTk3ZDA4OGMwMmZkMWUiLCJuYW1lIjoixLBicmFoaW0gQ2FuIE1lcmNhbiIsInBpY3R1cmUiOiJodHRwczovL3d3dy5ib29rc2llLmNvbS9maWxlcy9wcm9maWxlcy8yMi9tci1hbm9ueW1vdXMucG5nIiwiaWF0IjoxNTk3NDkwOTc2LCJleHAiOjE1OTg3ODY5NzZ9.qSZRISEEP2lBZ-5OTxI7tLzx6NU0ejwQ2l_59qQxyUs'
	}
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/user_following_list?username=Mercan', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		//'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjMxZTBkMzc4NTk3ZDA4OGMwMmZkMWUiLCJuYW1lIjoixLBicmFoaW0gQ2FuIE1lcmNhbiIsInBpY3R1cmUiOiJodHRwczovL3d3dy5ib29rc2llLmNvbS9maWxlcy9wcm9maWxlcy8yMi9tci1hbm9ueW1vdXMucG5nIiwiaWF0IjoxNTk3NDkwOTc2LCJleHAiOjE1OTg3ODY5NzZ9.qSZRISEEP2lBZ-5OTxI7tLzx6NU0ejwQ2l_59qQxyUs'
	}
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/reset_password?username=Mercan', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
	}
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/reset_password_verify?code=JBM0S3&username=Mercan', { // email=ultuma00@gmail.com
	method: 'GET',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
	}
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/

/*
fetch('http://localhost:3000/reset_password_change', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
	},
	body: JSON.stringify({
		code: "JBM0S3",
		username: "Mercan",
		password: "123456789"
	})
}).then(async res => {
	if (res.status === 429) {
		// Ekrana hata basılacak
		return console.log(res.status, res.statusText);
	}

	const data = await res.json();
	// Data içinde ki code sorgulanıcak öyle işlem yapılacak.
	console.log(data);
});
*/