import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  const { token } = req.headers;
  const requestData = {
    headers: req.headers,
    cookies: req.cookies,
  };
  return res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
};
