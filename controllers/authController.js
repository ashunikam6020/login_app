const db = require("../config/db");

exports.login = (req, res) => {

  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {

      if (err) {
        return res.json({ message: "Server Error" });
      }

      if (result.length > 0) {
        res.json({ message: "Login Success" });
      } else {
        res.json({ message: "Invalid Credentials" });
      }

    }
  );

};