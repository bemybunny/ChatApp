const { getAllMessage, addMessage } = require('../controller/messagecontroller');


const router = require('express').Router();
router.post('/addmsg/',addMessage);
router.get('/getallmsg/',getAllMessage)

module.exports = router;