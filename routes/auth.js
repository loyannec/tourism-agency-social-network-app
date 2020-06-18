const crypto = require("crypto");

module.exports = {
  
    getHashedPassword: (password) => {
      var hash = crypto.createHash("sha256")
      .update(password)
      .digest("hex");
      return hash;
    },
  };