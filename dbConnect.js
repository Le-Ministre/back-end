import mongoose from "mongoose";

async function dbConnect() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  
  mongoose
    .connect("mongodb+srv://portfolio:leportfolio@cluster0.wbpponr.mongodb.net/monPortfolio?retryWrites=true&w=majority&appName=Cluster0", {
    })
    .then(() => console.log(" MongoDB connecté"))
    .catch((err) => console.log(err));

 
}

export default dbConnect;