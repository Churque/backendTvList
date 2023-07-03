import {Router} from "express";
import { getUsers,getLoggedUser } from "../../src/controllers/user.controller.js";
import {createPersonalSerie,deletePersonalSerieById,getSerieByUser,editPersonalSerie} from "../../src/controllers/serie.controller.js";
import { authRequired } from "../middleware.js";

const router = Router();


//router.get("/:userId", getLoggedUser);
router.get("/:adminId",authRequired, getUsers);
router.post("/:userId/series",authRequired,createPersonalSerie);
router.get("/:userId/series",authRequired,getSerieByUser);
router.delete("/:userId/series/:serieId",authRequired,deletePersonalSerieById)
router.put("/:userId/series/:serieId",authRequired,editPersonalSerie);
export default router;
