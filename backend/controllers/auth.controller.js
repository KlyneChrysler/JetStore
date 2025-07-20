import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "[ USER ALREADY EXISTS ]" });
    }
    const user = await User.create({ name, email, password });
    res.status(200).json({ user, message: "[ USER CREATED SUCCESSFULLY ]" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  res.send("[ LOGIN ROUTE CALLED ]");
};

export const logout = async (req, res) => {
  res.send("[ LOGOUT ROUTE CALLED ]");
};
