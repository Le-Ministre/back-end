// import {v2 as cloudinary} from 'cloudinary';
          
// cloudinary.config({ 
//   cloud_name: 'dlm5zruvi', 
  // api_key: '982249597886668', 
  // api_secret: 'BC0r_uDkswKG9uTnlo5TCA1yf0Y' 
// });

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_KEY, 
  api_secret: process.env.CLOUD_KEY_SECRET 
});

// module.exports = cloudinary
export default cloudinary;