import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");  // this required authorization by the frontend to the backend

    if (!token) {   // token doesnt exist
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) { // we want the token tom start with bearer in the frontend
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
