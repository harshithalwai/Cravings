import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "Please login first",
    });
  }
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
    }
  }
};
export default authMiddleware;
