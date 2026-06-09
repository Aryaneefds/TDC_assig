import {Router }from "express";
import{ sendMatch} from "../controllers/matchController";
import{ getAllMatches} from "../controllers/matchController";



const router = Router();

router.post("/send",sendMatch);
router.get("/",getAllMatches);

export default router;