import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./db/connect.js";
import urlRouter from "./routes/url.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the url shortner.' });
});


app.use("/v1/api/url", urlRouter);

const start = async () =>{
    const MONGOURL = process.env.MONGOURL;
    const PORT = process.env.PORT || 8080;

    try {
        await connectDB(MONGOURL);
        app.listen(PORT, console.log(`app is listening to port ... ${PORT}`));
    } catch (error) {
        console.error("Error starting the server");
        console.log(error)
    }
}

start();