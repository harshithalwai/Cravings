import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "Please login first",
    });
  }
<<<<<<< HEAD:Backend/middlewares/authMiddlewarre.js
  
  else{
    try{
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=decoded.id;
        next();
    }catch(err){
        return res.json({
            success: false,
            message: "Invalid token, please login again",
        });
=======
  else {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = decoded.id;
      next();
    } catch (err) {
      return res.json({
        success: false,
        message: "Invalid token, please login again",
      });
>>>>>>> 92878726fc981a92d046ce49216a06d1a6141516:Backend/middlewares/authMiddleware.js
    }
  }
};
export default authMiddleware;
