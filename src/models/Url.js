import mongoose from "mongoose";

const Url = mongoose.Schema({
    longURl:{
        type: String,
        required: true
    },
    shortUrl:{
        type: String,
        required: true,
    }
})

export default mongoose.model('Url', Url);
