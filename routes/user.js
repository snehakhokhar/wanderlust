const express= require('express');
const router = express.Router();
const User = require('../models/user.js')
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const {saveRedirectUrl} = require('../middlewares.js');
const userController = require('../controllers/user.js');

//Signup Page
router.get("/signup",userController.renderSignupPage);

router.post("/signup",wrapAsync(userController.signup));

//Login page
router.get("/login",userController.renderLoginPage);
router.post("/login",saveRedirectUrl,
passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
}),userController.login);

router.get("/logout",userController.logout);

module.exports=router;