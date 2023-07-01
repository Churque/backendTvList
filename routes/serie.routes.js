import {Router} from "express";
import {getSeries,createGlobalSerie} from "../controllers/serie.controller.js";

const router = Router();


router.post("/:adminId", createGlobalSerie);
router.get("/:adminId", getSeries);

export default router;
