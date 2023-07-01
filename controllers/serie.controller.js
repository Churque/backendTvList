import SerieModel from "../models/serie.model.js";

async function createPersonalSerie(req, res) {
  try {
    if (!req.body.nombre || !req.body.estado || !req.body.capitulos || !req.body.minutos) {
      return res.status(400).send({ success: false, error: "Falta algún campo como nombre, estado, capítulos, minutos" });
    }
    await SerieModel.create({
      userId: req.params.userId,
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
  const userId = req.params.userId;
  const series = await SerieModel.find({ userId: userId });
  res.send({ series });
}

async function deletePersonalSerieById(req,res){
  try {
    const userId = req.params.userId;
    const serieId = req.params.serieId;
    const serie = await SerieModel.findOne({ userId, _id: serieId });
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
        const adminId = req.params.adminId;
        const series = await SerieModel.find();
        res.send({ series });
}



    
    async function editPersonalSerie(req, res) {
      const userId = req.params.userId;
      const serieId = req.params.serieId;
    
      try {
        const serie = await SerieModel.findOne({ userId, _id: serieId });
    
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
