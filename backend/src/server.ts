import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import  clientRoutes  from "./routes/clientRoutes";
import matchRoutes from "./routes/matchRoutes"

dotenv.config();
import {ai} from "./config/gemini";
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({ origin: '*'}));
app.use(express.json());


//ROUTES
app.use("/api/clients",clientRoutes);

app.use("/api/matches",matchRoutes);


connectDB();

app.get("/", (req,res) => {
    res.send("server setup");
})



app.get("/test-ai", async (req, res) => {
  
  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say hello"
    });

  res.json({
    text: response.text
  });

});


app.listen(PORT, ()=>{
    console.log('server running');
})