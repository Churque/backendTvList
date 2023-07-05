import SerieModel from "../models/serie.model.js";
import { verifyToken } from "../utils/jwt.js";
async function createPersonalSerie(req, res) {
  const authorizationHeader =req.headers.authorization || req.headers.Authorization;
  const token = authorizationHeader.split(" ")[1];
  const { id } = verifyToken(token);
  if(id === req.params.userId) {
  try {
    if (!req.body.nombre || !req.body.estado || !req.body.capitulos || !req.body.minutos) {
      return res.status(400).send({ success: false, error: "Falta algún campo como nombre, estado, capítulos, minutos" });
    }
    await SerieModel.create({
      userId: id,
      nombre: req.body.nombre,
      portada: req.body.portada,
      estado: req.body.estado,
      capitulos: req.body.capitulos,
      minutos: req.body.minutos,
    });

    res.status(201).send({ success: true });
  } catch (err) {
    res.status(500).send({ success: false, error: err });
  }
}

return res.status(404).send({ error:"no puedes crear una serie para otro usuario"});
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
    
        res.send({ success: true });
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
}


async function getSerieByUser(req, res) {
  const authorizationHeader =req.headers.authorization || req.headers.Authorization;
  const token = authorizationHeader.split(" ")[1];
  const { id } = verifyToken(token);
  //const userId = req.params.userId;
  if(id===req.params.userId) {
  const series = await SerieModel.find({ userId: id });
  res.send({ series });
  }
  res.status(200).send({"error":"no puedes ver las series de otros usuarios"});
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
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

async function getSeries(req, res) {
        //const adminId = req.params.adminId;
        const series = await SerieModel.find();
        res.send({ series });
}



    
    async function editPersonalSerie(req, res) {
      const authorizationHeader =req.headers.authorization || req.headers.Authorization;
      const token = authorizationHeader.split(" ")[1];
      const { id } = verifyToken(token);
      //const userId = req.params.userId;
      const serieId = req.params.serieId;
    
      try {
        const serie = await SerieModel.findOne({ id, _id: serieId });
    
        if (!serie) {
          return res.status(404).send({ error: "Serie no encontrada" });
        }
    
        serie.estado = req.body.estado;
        await serie.save();
    
        res.status(200).send({ success: true});
      } catch (error) {
        res.status(500).send({ success: false, error: error.message });
      }
    }
    

export { createPersonalSerie ,getSerieByUser,deletePersonalSerieById,getSeries,createGlobalSerie,editPersonalSerie};
