import UserModel from "../models/user.model.js";
async function getUsers(req, res) {
  try {
    const users = await UserModel.find({});

    if (users.length === 0) {
      return res
        .status(404)
        .send({ success: false, error: "No se encontraron usuarios" });
    }

    res.send({ users, response: true });
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getLoggedUser(req, res) {
  try {
    const userId = req.params.userId;
    const userLogged = await UserModel.findOne({ id: userId });

    res.send({ userLogged, success: true });
  } catch (err) {}
}



export { getUsers, getLoggedUser };
