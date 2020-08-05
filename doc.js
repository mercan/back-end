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
fetch('http://localhost:3000/create-event', {
	method: 'POST',
	headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiOTg0NjQ4NTkwODE2ZGNkYTY4MzUiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vd3d3LmJvb2tzaWUuY29tL2ZpbGVzL3Byb2ZpbGVzLzIyL21yLWFub255bW91cy5wbmciLCJpYXQiOjE1OTQ1OTUzOTksImV4cCI6MTU5NzE4NzM5OX0.otV_dFkJiQjPJ6P16CUahcs3cuIc9RYJmZhlEfeXluU'
  },
	body: JSON.stringify({
 		name: 'Caldwell', 
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
		username: 'Admin',
		name: 'Admin-Admin',
		email: 'admin@gmail.com',
		password: 'admin123456'
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
 // username: 'Deneme',
		email: 'deneme@gmail.com',
		password: 'deneme123456'
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
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiYTNjNzFhZTBiNjAwMTc0ODk3NDAiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vc2NvbnRlbnQtaWFkMy0xLnh4LmZiY2RuLm5ldC92L3QxLjMwNDk3LTEvY3AwL2MxNS4wLjUwLjUwYS9wNTB4NTAvODQ2MjgyNzNfMTc2MTU5ODMwMjc3ODU2Xzk3MjY5MzM2MzkyMjgyOTMxMl9uLmpwZz9fbmNfY2F0PTEmX25jX3NpZD0xMmIzYmUmX25jX29oYz1PTzBCUmxVMExzY0FYX1JMRHNUJl9uY19odD1zY29udGVudC1pYWQzLTEueHgmb2g9NWNmNTViZTBjNmFkY2IzODI5Mzg2N2RlMDgwZjg1NzEmb2U9NUYzMjFFMzgiLCJpYXQiOjE1OTQ1OTgzNDMsImV4cCI6MTU5NzE5MDM0M30.Ej-_cLaUIN5__m0dW1DZhh3Go6Rwwu6GH4tpPYwtxYY'
	},
	body: JSON.stringify({
		userID: '5f0b984648590816dcda6835', // Takip edeceğin / Takip etmeyi bırakacağın kişi ID
		type: 'Follow' // Unfollow / Follow
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



fetch('http://localhost:3000/user_follow_list?username=Mercan', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json; charset=utf-8',
		'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI1ZjBiYTNjNzFhZTBiNjAwMTc0ODk3NDAiLCJuYW1lIjoixLBicmFoaW0gTWVyY2FuIiwicGljdHVyZSI6Imh0dHBzOi8vc2NvbnRlbnQtaWFkMy0xLnh4LmZiY2RuLm5ldC92L3QxLjMwNDk3LTEvY3AwL2MxNS4wLjUwLjUwYS9wNTB4NTAvODQ2MjgyNzNfMTc2MTU5ODMwMjc3ODU2Xzk3MjY5MzM2MzkyMjgyOTMxMl9uLmpwZz9fbmNfY2F0PTEmX25jX3NpZD0xMmIzYmUmX25jX29oYz1PTzBCUmxVMExzY0FYX1JMRHNUJl9uY19odD1zY29udGVudC1pYWQzLTEueHgmb2g9NWNmNTViZTBjNmFkY2IzODI5Mzg2N2RlMDgwZjg1NzEmb2U9NUYzMjFFMzgiLCJpYXQiOjE1OTQ1OTgzNDMsImV4cCI6MTU5NzE5MDM0M30.Ej-_cLaUIN5__m0dW1DZhh3Go6Rwwu6GH4tpPYwtxYY'
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
