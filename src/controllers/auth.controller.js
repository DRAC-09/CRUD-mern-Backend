import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json(["The email already is use"]);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSaved = await newUser.save();

    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      token: token,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json(["User not Found"]);

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json(["Error Password"]);
    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      token: token,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "User no found" });
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  const requestData = {
    headers: req.headers,
    cookies: req.cookies,
  };
  if (!token) return res.status(401).json({ requestData });
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized code:1" });
    const userFound = await User.findById(user.id);
    if (!userFound)
      return res.status(401).json({ message: "Unauthorized code:2" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};
