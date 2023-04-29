import express from "express";
import { searchEverything } from "../controllers/search";

const searchRouter = express.Router();

//Routes
searchRouter.get("/", searchEverything);

export default searchRouter;
