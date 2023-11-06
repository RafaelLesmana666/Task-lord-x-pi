const jwt = require('jsonwebtoken');
const config = process.env;

function verifyToken (req,res,next){
  if(req.headers["api-key"] != process.env.API_KEY){
    return res.status(401).json({
        message: "Api Key DiButuhkan!"
    });
  };

  const token = req.headers['token'];

  if (!token) {
      return res.status(403).json({
        message: "A token is required for authentication"
      });
  }
  try {

    const cek = jwt.verify(token, config.API_KEY);
    console.log(cek);

  } catch (err) {

    return res.status(401).json({
      message: "Invalid Token or Expired"
    });

  }

  return next();
}

module.exports = verifyToken;