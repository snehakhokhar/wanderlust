const Listing = require("../models/listing.js");
const mbxClient = require('@mapbox/mapbox-sdk');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const maptoken = process.env.MAP_TOKEN;
const baseClient = mbxClient({ accessToken: maptoken });
const geocodingClient = mbxGeocoding(baseClient);

module.exports.index=async (req,res)=>{
const listings=await Listing.find();
res.render("listings/index.ejs",{listings:listings});
};

module.exports.renderNewform=(req,res)=>{
    res.render("listings/new.ejs");
};
module.exports.createListing=async(req, res,next) => {
let response = await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 2
})
  .send()
  

    let url=req.file.path;
    let filename=req.file.filename;
    // console.log(url,"..",filename);// Debugging line to check the file upload
    const newListing=new Listing(req.body.listing);
    newListing.owner=req.user._id; // Assign the owner to the logged-in user
    newListing.image={url,filename}; // Set the image field with the uploaded file's URL and filename
    
    newListing.geometry=response.body.features[0].geometry; // Set the geometry field with the geocoded location
    
    await newListing.save();
    req.flash("success","your new listing created succesfully!");
    res.redirect("/listings");   
};

module.exports.showListing=async (req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({path:"reviews",populate:{path:"author"},
})
    .populate("owner");
    if(!listing){
        req.flash("error","Listing does not exist!");
        res.redirect("/listings");
    }
    else{
        console.log(listing);
    res.render("listings/show.ejs",{listing});
    }
};
module.exports.renderEditForm=async (req,res)=>{
    const {id}=req.params;
    const listing=await Listing.findById(id);
    
    if(!listing){
        req.flash("error","Listing does not exist!");
        return res.redirect("/listings");
    }
    
    let originalImage = null;
    if (listing.image && listing.image.url) {
        originalImage = listing.image.url.replace(/\\/g, '/');
    }
    res.render("listings/edit.ejs", { listing, originalImage });
};
module.exports.updateListing=async(req,res)=>{ 
   const {id}=req.params;
   let listing= await Listing.findByIdAndUpdate(id, {...req.body.listing});
   
   if(typeof req.file!=="undefined"){ // Check if a new file was uploaded
       // If a new file is uploaded, update the image field
   let url=req.file.path;
   let filename=req.file.filename;
   listing.image={url,filename}; // Update the image field with the new file's URL and filename
   await listing.save();
}
    req.flash("success","listing updated succesfully!");
    res.redirect(`/listings/${id}`);
    
};
module.exports.destroyListing=async (req,res)=>{
    const {id}=req.params;
    let deletedList= await Listing.findByIdAndDelete(id);
    console.log( deletedList);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
};