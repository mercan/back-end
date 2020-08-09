const amqp = require('amqplib');

module.exports = async message => {
	try {
		const connection = await amqp.connect("amqp://localhost:5672");
		const channel = await connection.createChannel();
		const assertion = await channel.assertQueue("newAccountSendEmail");

		channel.sendToQueue("newAccountSendEmail", Buffer.from(JSON.stringify(message)));
	} catch (error) {
		console.error(error);
	}
}
