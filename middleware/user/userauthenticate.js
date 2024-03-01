const userDB = require("../../model/user/userModel");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "vnvosioirrituriowa";

const userauthenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log("token", token);
    const veriftoken = jwt.verify(token, SECRET_KEY);
    // user ko find krna
    const rootUser = await userDB.findOne({ _id: veriftoken._id });
    if (!rootUser) {
      throw new Error("user not found");
    }
    req.token = token;
    (req.rootUser = rootUser), (req.userId = rootUser._id),(req.userMainId=rootUser.id);

    next();
  } catch (error) {
    return res.status(400).json({ error: "unauthorized No token Provide" });
  }
};
module.exports = userauthenticate;
