const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwttoken;
    console.log("tokenskdbcjdc", token);
    console.log("jwttoken", token);
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log(verifyToken, "Tokeb verify");

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    console.log(req.token);

    next();
  } catch (err) {
    console.log(err);
    res.status(401).send("Unauthorized token");
  }
};

module.exports = authenticate;


