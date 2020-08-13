const validator = {
	isEmail: email => {
		if (!email) {
			return { code: 400, message: 'Email cannot be empty.' };

		} else if (email.length > 60 || email.length < 14) {
			return { code: 400, message: 'Email is invalid.' };

		} else {
			if (!email.includes('@') || !email.includes('.')) {
				return { code: 400, message: 'Email is invalid.' };
			}

			return { code: 200 };
		}
	},

	isUsername: username => {
		if (!username) {
			return { code: 400, message: 'Username cannot be empty.' };

		} else if (username.length > 40 || username.length < 3) {
			return { code: 400, message: 'Username is invalid.' };

		} else {
			const deneme = [
				'!', "'", '^', '+', '%', '&', '/', '(', ')', '=', '?',
				'>', '£', '#', '$', '½', '{', '}', '[', ']',  '|',
				''
			]

		}

	},

}




const emailValid = validator.isEmail("ultuma00@gmail.com");
