const sgMail = require('@sendgrid/mail');
const amqp = require('amqplib');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

connectRabbitMQ();

async function connectRabbitMQ() {
	try {
		const connection = await amqp.connect("amqp://localhost:5672");
		const channel = await connection.createChannel();
		const assertion = await channel.assertQueue("resetPassword");

		console.log("Email Gönderimi İçin Bekliyor...");

		// Mesajın Alınması...
		channel.consume("resetPassword", async data => {
			const user = JSON.parse(data.content.toString());
			const msg = {
				to: `${user.email}`,
				from: 'mrcnn77@gmail.com',
			  subject: `Uygulama Adı Parola Sıfırlama`,
			 	text: `Parola Sıfırlama Kodu: ${user.resetCode}
			 	Kod 1 Saat geçerlidir.`,
			 	//html: '<strong>and easy to do anywhere, even with Node.js</strong>',
			}

			const sendEmail = await sgMail.send(msg);

			sendEmail[0].statusCode === 202 ? channel.ack(data) : channel.nack(data);
		});

	} catch (error) {
		console.error(error);
	}
}