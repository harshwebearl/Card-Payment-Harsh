const express = require('express');
const router = express.Router();
const { appAdminSignIn } = require('./Admin.Login.Controller');

router.post('/admin/login', appAdminSignIn);

module.exports = router;
