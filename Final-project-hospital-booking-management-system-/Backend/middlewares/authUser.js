import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // Expected: Bearer <token>

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized. Token Missing",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id; // Attach patient ID for use in controllers
    next();
  } catch (err) {
    console.error("Patient Auth Error:", err.message);

    return res.status(401).json({
      success: false,
      message: err.name === "TokenExpiredError" ? "Token Expired" : "Invalid Token",
    });
  }
};

export default authUser;
