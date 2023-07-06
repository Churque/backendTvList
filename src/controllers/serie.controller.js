import SerieModel from "../models/serie.model.js";
import { verifyToken } from "../utils/jwt.js";


async function createPersonalSerie(req, res) {
  const authorizationHeader =req.headers.authorization || req.headers.Authorization;
  const token = authorizationHeader.split(" ")[1];
  const { id } = verifyToken(token);

  try {
    if (!req.body.nombre || !req.body.estado || !req.body.capitulos || !req.body.minutos) {
      return res.status(400).send({error: "Falta algún campo como nombre, estado, capítulos, minutos" });
    }
    await SerieModel.create({
      userId: id,
      nombre: req.body.nombre,
      portada: req.body.portada,
      estado: req.body.estado,
      capitulos: req.body.capitulos,
      minutos: req.body.minutos,
    });

    return res.status(201).send({ success: true });
  } catch (err) {
    return res.status(500).send({ success: false, error: err });
  }

}

async function createGlobalSerie(req,res){

  try {

        if (!req.body.nombre || !req.body.estado || !req.body.capitulos || !req.body.minutos) {
          return res.status(400).send({ error: "Falta algún campo como nombre, estado, capítulos, minutos" });
        }
        await SerieModel.create({
          nombre: req.body.nombre,
          portada: req.body.portada,
          estado: req.body.estado,
          capitulos: req.body.capitulos,
          minutos: req.body.minutos,
        });
    
        return res.send({ success: true });
      } catch (err) {
        return res.status(500).send({ error: err.message });
      }
}


async function getSerieByUser(req, res) {
  const authorizationHeader =req.headers.authorization || req.headers.Authorization;
  const token = authorizationHeader.split(" ")[1];
  const { id } = verifyToken(token);
  //const userId = req.params.userId;
  //if(id===req.params.userId) {
  const series = await SerieModel.find({ userId: id });
  return res.send({ series });
  //}
  return res.status(200).send({"error":"no puedes ver las series de otros usuarios"});
  //res.status(200).send({"todo": "bien"});
}

async function deletePersonalSerieById(req,res){
  const authorizationHeader =req.headers.authorization || req.headers.Authorization;
  const token = authorizationHeader.split(" ")[1];
  const { id } = verifyToken(token);
  try {
    //const userId = req.params.userId;
    const serieId = req.params.serieId;
    const serie = await SerieModel.findOne({ id, _id: serieId });
    if (!serie) {
      return res.status(403).send({ error: "Serie no encontrada" });
    }

    const deletionResult = await SerieModel.deleteOne({ _id: serieId });
    if (deletionResult.deletedCount === 1) {
      return res.sendStatus(204);
    } else {
     return res.sendStatus(404);
    }
  } catch (err) {
   return res.status(500).send({ error: err.message });
  }
}

async function getSeries(req, res) {
        //const adminId = req.params.adminId;
        
        const series = await SerieModel.find();
        return res.send({ series });
}


    async function editPersonalSerie(req, res) {
      const authorizationHeader =req.headers.authorization || req.headers.Authorization;
      const token = authorizationHeader.split(" ")[1];
      const { id } = verifyToken(token);
      //const userId = req.params.userId;
      const serieId = req.params.serieId;
    
      try {
        const serie = await SerieModel.findOne({userId:id,_id: serieId });
    
        if (!serie) {
          return res.status(404).send({ error: "Serie no encontrada" });
        }
        serie.estado = req.body.estado;
        await serie.save();
    
        return res.status(200).send({ success: true});
      } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
      }
    }

    async function deleteSerie(req,res){
      try {
        //const userId = req.params.userId;
        const serieId = req.params.serieId;
        const serie = await SerieModel.findOne({ _id: serieId });
        if (!serie) {
          return res.status(403).send({ error: "Serie no encontrada" });
        }
    
        const deletionResult = await SerieModel.deleteOne({ _id: serieId });
        if (deletionResult.deletedCount === 1) {
          return res.sendStatus(204);
        } else {
          return res.sendStatus(404);
        }
      } catch (err) {
        return res.status(500).send({ error: err.message });
      }
    }
    

export { createPersonalSerie ,getSerieByUser,deletePersonalSerieById,getSeries,createGlobalSerie,editPersonalSerie,deleteSerie};
