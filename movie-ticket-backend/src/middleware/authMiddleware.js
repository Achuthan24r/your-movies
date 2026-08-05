const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);
   console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);
console.log("JWT SECRET:", process.env.JWT_SECRET);
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    console.log("TOKEN PARTS:", token.split(".").length);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {
    console.log("JWT ERROR:", error.name);
    console.log("JWT MESSAGE:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

module.exports = protect;