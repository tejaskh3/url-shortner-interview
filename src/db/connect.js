import mongoose from "mongoose";
export const connectDB = async (url) => {
    try{
        await mongoose.connect(url);
        console.log("Connected to DB successfully.")
    }
    catch(error){
        console.error("Error connecting with DB", error.message);
    }
}
