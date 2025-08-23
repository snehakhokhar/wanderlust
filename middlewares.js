const Listing=require("./models/listing.js");
const Review=require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");
const {reviewSchema} = require("./schema.js");
module.exports.isLoggedIn=(req,res,next)=>{
if(!req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must login to creat post");
       return res.redirect("/login");
    }
next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner=async(req,res,next)=>{
     const {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("error","You do not have permission to edit this listing!");
    return res.redirect(`/listings/${id}`);
    
    }
    next();
}
module.exports.validateListing=async(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}
module.exports.validateReview=(req,res,next)=>{
    
    let {error}=reviewSchema.validate(req.body);
    if(error){
    let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
   }else{
    next();
   }
};

module.exports.isReviewAuthor=async(req,res,next)=>{
    const {id,reviewId} = req.params;
    const review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You do not have permission to delete this review!");
        return res.redirect(`/listings/${req.params.id}`);
    }
    next();
};
