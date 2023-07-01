import {Router} from "express";
import { getUsers,getLoggedUser } from "../../src/controllers/user.controller.js";
import {createPersonalSerie,deletePersonalSerieById,getSerieByUser,editPersonalSerie} from "../../src/controllers/serie.controller.js";
const router = Router();


//router.get("/:userId", getLoggedUser);
router.get("/:adminId", getUsers);
router.post("/:userId/series",createPersonalSerie);
router.get("/:userId/series",getSerieByUser);
router.delete("/:userId/series/:serieId",deletePersonalSerieById)
router.put("/:userId/series/:serieId",editPersonalSerie);
export default router;
