import mongoose from "mongoose";

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  
  mongoose
    .connect(process.env.MONGODB_URI, {
    })
    .then(() => console.log(" MongoDB connecté"))
    .catch((err) => console.log(err));

 
}

export default dbConnect;