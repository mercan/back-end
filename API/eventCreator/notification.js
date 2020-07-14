// Token
const VerifyToken  = require('../../middleware/api-verify-token');

// Package
const router = require('express').Router();

// Models
const Notification = require('../../models/Notification');
const Event  			 = require('../../models/Event');
const User   			 = require('../../models/User');


router.post('/notification-add', VerifyToken, async (req, res) => {
	const { eventCode } = req.body;

	if (!eventCode) {
		return res.status(400).json({ code: 400 });
	}
	
	const event = await Event.findOne({ eventCode, deleteEvent: false },
		'creator.userID'
	);

	if (!event) {
		return res.status(400).json({ code: 4041 });
	}

	const user = await User.findOne({ _id: req.decode.userid }, 'email');

	if (!user) {
		return res.status(400).json({ code: 4042 });
	}

	if (!user.email) {
		return res.status(400).json({ code: '4004email' });
	}
		
	const notification = await Notification.findOne(
		{ 
			userID: event.creator[0].userID 
		}, 
		'_id'
	);

	if (!notification) {
		const newNotification = new Notification({
			userID: event.creator[0].userID,
			notifications: {
				userID: user._id,
				email: user.email
			}
		}).save().then(() => true).catch(err => false);

		return newNotification ? res.json({ code: 200 })
			: res.status(400).json({ code: -1 });
	}

	const notificationControl = await Notification.findOne(
		{ 
			userID: event.creator[0].userID, 
			'notifications.userID': user._id
		}, 
		' _id '
	);

	if (notificationControl) {
		return res.status(400).json({ code: '4000email' });
	}

	const pushUserNotification = await Notification.updateOne(
		{ 
			userID: event.creator[0].userID 
		}, 
		{
			$push: {
				notifications: {
					userID: user._id,
					email: user.email
				}
			}
		}
	);

	return pushUserNotification.nModified ? res.json({ code: 200 })
		: res.status(400).json({ code: -1 });
});



router.post('/notification-delete', VerifyToken, async (req, res) => {
	const { notificationID, allDeleteNotification } = req.body;
	
	if (!notificationID && !allDeleteNotification) {
		return res.status(400).json({ code: 400 });
	}

	const user = await User.findOne({ _id: req.decode.userid }, ' email ');

	if (!user) {
		return res.status(400).json({ code: 4042 });
	}

	if (allDeleteNotification) {
		const deleteNotification = await Notification.updateMany({ }, {
			$pull: {
				notifications: {
					userID: req.decode.userid
				}
			}
		});

		return deleteNotification.nModified ? res.json({ code: 200 })
			: res.status(400).json({ code: '4005email' });
	}

	const notification = await Notification.findOne(
		{ 
			_id: notificationID, 
			'notifications.userID': req.decode.userid 
		}, 
		'_id'
	);

	if (!notification) {
		return res.status(400).json({ code: '4005email' });
	}

	const deleteNotification = await Notification.updateOne({ _id: notificationID }, {
		$pull: {
			notifications: {
				userID: req.decode.userid
			}
		}
	});

	return deleteNotification.nModified ? res.json({ code: 200 })
		: res.status(400).json({ code: '4005email' });
});

module.exports = router;