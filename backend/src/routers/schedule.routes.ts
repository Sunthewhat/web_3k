import scheduleController from "../controller/schedule.controller";
import { Router } from "express";

const schedule = Router();

schedule.get("/getMatch", scheduleController.getMatch);


export default schedule;
