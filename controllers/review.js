const Listing = require("../models/listing.js");
const Review= require("../models/review.js");

module.exports.creatReview = async(req,res)=>{
let listing=await Listing.findById(req.params.id);
if (!listing) {
        throw new ExpressError(404, "Listing not found"); // 👈 Fix for your issue
    }

let newReview=new Review(req.body.review);
newReview.author=req.user._id; // Assign the author to the logged-in user
listing.reviews.push(newReview);
await newReview.save();
await listing.save();
req.flash("success","your new Review created!");
res.redirect(`/listings/${listing._id}`);

};

module.exports.destroyReview = async (req,res)=>{
  let{id,reviewId}=req.params;
  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success","Review deleted!");
 res.redirect(`/listings/${id}`);
};