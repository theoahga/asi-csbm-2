const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Chat Server is running');
});

module.exports = router;
