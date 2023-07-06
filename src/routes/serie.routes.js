import {Router} from "express";
import {getSeries,createGlobalSerie, deleteSerie} from "../controllers/serie.controller.js";

const router = Router();


router.post("/:adminId", createGlobalSerie);
router.get("/:adminId", getSeries);
router.delete("/:serieId", deleteSerie);

export default router;
