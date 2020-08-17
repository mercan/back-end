const accountSid = process.env.TWILLO_ACCOUNT_ID; 
const authToken = process.env.TWILLI_SMS_AUTH_TOKEN; 
const client = require('twilio')(accountSid, authToken); 
 
async function sendTwoFactorCodeSMS(phone_number, twoFactorCode) {
	let response;

	try {
		response = await client.messages.create({ 
			body: `Verification PIN ${twoFactorCode}`, 
			from: '+12513090923',       
			to: `${phone_number}` 
		});
	} catch (error) {
		console.error(error);
	}

	return !response.errorCode ? true : false;
}

module.exports = sendTwoFactorCodeSMS;