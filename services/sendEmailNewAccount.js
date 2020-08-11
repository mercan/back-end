const sgMail = require('@sendgrid/mail');
const amqp = require('amqplib');
const fs = require('fs');

sgMail.setApiKey("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");

connectRabbitMQ();

async function connectRabbitMQ() {
	try {
		const connection = await amqp.connect("amqp://localhost:5672");
		const channel = await connection.createChannel();
		const assertion = await channel.assertQueue("newAccountSendEmail");

		console.log("Email Gönderimi İçin Bekliyor...");

		// Mesajın Alınması...
		channel.consume("newAccountSendEmail", async data => {
			const user = JSON.parse(data.content.toString());
			const msg = {
				to: `${user.email}`,
				from: 'mrcnn77@gmail.com',
			  subject: `Hoşgeldin ${user.name}`,
			 	text: `
			 	${user.name} Hoşgeldin!
			 	`,
			 	//html: '<strong>and easy to do anywhere, even with Node.js</strong>',
			}

			const sendEmail = await sgMail.send(msg);

			if (sendEmail[0].statusCode === 202) {
				channel.ack(data);
				const log = `Email: ${user.email} - Name: ${user.name} - Date: ${new Date()} - Gönderildi\n`;
				
				fs.appendFile('sendEmailNewAccountLog.txt', log, 'utf8', err => {
				  if (err) throw err;
				});
				return;
			}

			channel.nack(data);
			const log = `Email: ${user.email} - Name: ${user.name} - Date: ${new Date()} - Gönderilemedi\n`;			
			
			fs.appendFile('sendEmailNewAccountLog.txt', log, 'utf8', err => {
				if (err) throw err;
			});

		});

	} catch (error) {
		console.error(error);
	}
}