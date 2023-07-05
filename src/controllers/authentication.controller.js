import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";


async function createUser(req, res) {
  const password = req.body.password;
  const encryptedPassword = bcrypt.hashSync(password, 10);
  try {
    const createdUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: encryptedPassword,
      roles: "usuario",
    });
    const users = await User.find().populate("name");
    const matchUser = users.find(
      (user) =>
        user.name === createdUser.name ||
        createdUser.email === user.email
    );
    if (matchUser) {
      return res
        .status(400)
        .send({
          error:
            "Error falta campo o ya los datos ya fueron utilizados para crear un usuario",
        });
    } else {
      await createdUser.save();
      return res.status(201).send({ sucess: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
}

async function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });

    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ error: "missing data" });
    }

    if (!user) {
      res.send({ logged: false, message: "email not found" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = generateToken(user);
      return res.status(200).send({ user, token });
    } else {
      res.send({ logged: "wrong password" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

export { createUser, loginUser };
