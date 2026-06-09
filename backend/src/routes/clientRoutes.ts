import { Router } from "express";

import{ getAllClients,getClientById } from "../controllers/clientController"
import { createClient } from "../controllers/clientController";
import { addNote } from "../controllers/clientController";
import { updateStatus } from "../controllers/clientController";
import {getMatches} from "../controllers/clientController";
import { getAiMatches} from "../controllers/clientController";

const router = Router();

router.get("/",getAllClients);

router.get("/:id",getClientById);

router.post("/", createClient);

router.post("/:id/notes", addNote);

router.patch("/:id/status",updateStatus);

router.get("/:id/matches",getMatches);

router.get("/:id/ai-matches",getAiMatches);

export default router;


