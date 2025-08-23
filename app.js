require('dotenv').config(); // Load environment variables from .env file
const express= require('express');
const app = express();

// const Listing = require("./models/listing.js");

const mongoose = require("mongoose");
const dbUrl=process.env.ATLASDB_URL;
const path=require("path");
const methodOverride = require('method-override');
const ejsMate=require("ejs-mate");
 const ExpressError = require("./utils/ExpressError.js");

// const {listingSchema,reviewSchema} = require("./schema.js");
// const { wrap } = require('module');
const passport=require("passport");
const LocalStrategy=require("passport-local");
const listingsRouter = require('./routes/listing.js');
const reviewsRouter = require('./routes/reviews.js');
const userRouter=require("./routes/user.js");

const session = require('express-session');//session observe the activities of web and their session
const MongoStore = require('connect-mongo');//to store the session in database
const flash=require('connect-flash');//flash library to flash the message
 const User = require('./models/user.js');

app.use(methodOverride('_method')); // Allows for PUT and DELETE methods in forms
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public"))); // Serves static files from the public directory
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(express.json()); // Parses JSON data
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

async function main(){
    await mongoose.connect(dbUrl);
}
main().then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.error("Error connecting to MongoDB:", err);
});
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*60*60,
});
store.on("error",()=>{
    console.log("Session store error",err);
});
const sessionOption={
    store:store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
    
}

app.use(session(sessionOption));
app.use(flash()); 


// app.get("/testListening",async (req,res)=>{
    //     let sampleListing=new Listing({
        //         title:"my home villa",
        //         description:"a beautiful home villa",
        //         price:"500",
        //         image:"",
        //         location:"SasanGir",
//         country:"India",
//     });
//    await sampleTesting.save();
//     res.send("Test listing created successfully");
//     console.log("Test listing created successfully");
// });

app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});
app.use("/listings", listingsRouter); // Use the listing routes defined in routes/listing.js
app.use("/listings", reviewsRouter);// Use the review routes defined in routes/reviews.js
app.use("/",userRouter); 
app.listen(8080,()=>{
    console.log("Server is running on port 8080");
});
// app.get("/demouser",async(req,res)=>{
// let fakeUser=new User({
//     email:"student123@gmail.com",
//     username:"random"
// });
// let final=await User.register(fakeUser,"helloWorld");
// res.send(final);
// });

 
app.get(/(.*)/,(req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});


app.use((err, req, res, next) => {
    let {statusCode=500, message="Something went wrong!"} = err;
    res.status(statusCode).render("error.ejs", {message: message});
    // res.send("something went wrong!");
    
});



module.exports = app;                                                                                                       