const jwt = require("jsonwebtoken");

const authorization = (req, res, next) =>{
  try {
    let modified = req.params.authorid;

    let token = req.headers["x-api-key"];
    if (!token)
      return res.status(404).send({ status: false, message: "Token must be present" });

    let decodedToken = jwt.verify(token, "Secret-key"); //it's a method to verify the token is correct or not
    if (!decodedToken)
      return res.status(400).send({ status: false, message: "Invalid token" });
    let loginAuthor = decodedToken.authorid;

    if (modified != loginAuthor)  
      return res.send({
        status: false,
        msg: "Author is not access the request",
      });

    next();
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

module.exports.authorization = authorization;
