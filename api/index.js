import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
const app = express();
dotenv.config()


const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
    } catch (error) {
        throw error
    }
};

mongoose.connection.on("disconected", () => {
    console.log("mongoDB disconnected!");
});
// mongoose.connection.on("connected", () => {
//     console.log("mongoDB connected!");
// });

//Middlwarea

app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((req, res, next) => {
    console.log("Hi Im a middleware!");
})


app.listen(8200, () => {
    connect()
    console.log("Conected to Backend!");
});