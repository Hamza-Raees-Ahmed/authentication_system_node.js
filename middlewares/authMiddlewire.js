import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  const token = req.headers.authorization;
//   console.log(token,"++++++++++ token")
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next(); // Proceed to next middleware or route
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default protect;
