import express from "express";
import { authenticateUser } from "../middlewares/auth";
import {
  becomeInstructor,
  getAllInsturctorIds,
  getInstructors,
  getSingleInstructor,
} from "../controllers/instructors";

const instructorRouter = express.Router();

instructorRouter.post("/becomeInstructor", authenticateUser, becomeInstructor);

instructorRouter.get("/", getInstructors);
instructorRouter.get("/id", getAllInsturctorIds);
instructorRouter.get("/:id", getSingleInstructor);

export default instructorRouter;
