const express= require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const {listingSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middlewares.js")
const listingController = require("../controllers/listing.js");
const multer  = require('multer');// Middleware for handling multipart/form-data, which is used for uploading files
const {storage}=require("../cloudConfig.js"); // Importing the Cloudinary storage configuration
const upload = multer({ storage })// Set the destination for uploaded files

//indexRote
router.get("/", wrapAsync(listingController.index)
);
//new route
router.get("/new",isLoggedIn,listingController.renderNewform);
router.post("/",isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
wrapAsync(listingController.createListing));

//show route
router.get("/:id",wrapAsync(listingController.showListing));

//edit route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));
router.put("/:id",
    isLoggedIn,
    upload.single('listing[image]'),
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing));

//delete route
router.delete("/:id",isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing));

module.exports = router;