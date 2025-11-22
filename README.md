Wanderlust is a full-stack travel stay booking application, inspired by Airbnb.
It allows users to explore listings, create their own listings, leave reviews, authenticate using Passport.js, and upload images with Cloudinary.

This project was built as a part of learning Node.js, Express, MongoDB, and Full-Stack Web Development.
🚀 Features
🔐 User Authentication

User signup & login using Passport.js
Sessions stored in MongoDB
Flash messages for feedback
User-specific actions (only owners can edit/delete)

🏡 Listings

Create new listings
Edit/update existing listings
Delete your own listings
Each listing includes:
Title
Image
Description
Price
Location
Country

🖼️ Image Upload (Cloudinary)

Upload listing images directly through the UI
Cloudinary stores and returns optimized image URLs

⭐ Reviews

Add reviews to listings
Delete reviews
Server-side validation for reviews
Automatic linking to listing pages

🛡️ Robust Backend

Express.js
EJS templating
Joi validation
Custom middleware
Centralized error handling with ExpressError
Method Override for PUT/DELETE

🧰 Tech Stack

Frontend
HTML
CSS
JavaScript
Bootstrap
EJS Templates
Backend
Node.js
Express.js
Passport.js
Joi Validation
Method-Override
Database
MongoDB
Mongoose ORM
Cloud Services
Cloudinary (image hosting)

