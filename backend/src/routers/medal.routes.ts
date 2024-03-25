import medalController from "../controller/medal.controller";
import { Router } from "express";

const medal = Router();

medal.get("/getScore", medalController.getMedalList);
medal.get("/getScoreInput", medalController.getScoreInput);

export default medal;
