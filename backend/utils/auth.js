const jwt = require("jsonwebtoken");
const encConfig = require("./encconfig");
const createResult = require("./result");

function authUser(req, res, next) {
  const url = req.url;
  // Skip authentication for login/register
  if (
    url === "/user/authenticate" ||
    (url === "/user/" && req.method === "POST")
  ) {
    next();
  } else {
    const bearerToken = req.headers.authorization;
    if (bearerToken) {
      const token = bearerToken.split(" ")[1];
      try {
        // get payload (uid and email) and store in current req
        const payload = jwt.verify(token, encConfig.secret);
        req.curuser = payload;
        req.curuser.role =
          payload.email == "admin@gmail.com" ? "ROLE_ADMIN" : "ROLE_USER";
        // authorization
        // allow /foods/* POST, PUT, DELETE only to ADMIN
        if (
          url.startsWith("/foods") &&
          req.method !== "GET" &&
          req.curuser.role !== "ROLE_ADMIN"
        )
          return res.send(createResult("Unauthorized"));
        next();
      } catch (ex) {
        res.send(createResult("Token is Invalid"));
      }
    } else {
      res.send(createResult("Token is Missing"));
    }
  }
}

module.exports = authUser;
