const UserService = require("../services/UserService");

const register = async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(200).send({ message: "New user created", data: user });
  } catch (err) {
    if (err.message.startsWith("E11000")) {
      res.status(400).send({ error: "Email is already registered" });
    } else {
      res.status(400).send({ error: err.message });
    }
  }
};

const login = async (req, res) => {
  const token = await UserService.getToken(req.body);

  if (token === undefined) {
    res.status(401).send({
      message: "Invalid credentials",
    });
  } else {
    res.status(200).send({ message: "Successful login", token });
  }
};

module.exports = {
  register,
  login,
};
