import {Router} from "express";
import {getLoggedUser,getUsers} from "../controllers/user.controller.js";
import {createPersonalSerie,deletePersonalSerieById,getSerieByUser,editPersonalSerie} from "../controllers/serie.controller.js";
const router = Router();


//router.get("/:userId", getLoggedUser);
router.get("/:adminId", getUsers);
router.post("/:userId/series",createPersonalSerie);
router.get("/:userId/series",getSerieByUser);
router.delete("/:userId/series/:serieId",deletePersonalSerieById)
router.put("/:userId/series/:serieId",editPersonalSerie);
export default router;
