import express from "express";
import cors from 'cors';
import connect from "./src/configs/mongo.js";
import authenticacionRouter from './src/routes/authentication.routes.js'
import usersRouter from './src/routes/user.routes.js'
import seriesRouter from './src/routes/serie.routes.js';



const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth",authenticacionRouter)
app.use("/users",usersRouter);
app.use("/series",seriesRouter);


console.log("Connecting to database...");
connect()
  .then(() => {
    console.log("Mongo connected successful");
    app.listen(3000, async () => {
      console.log(`Server is running on PORT: 3000`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(-1);
  });
