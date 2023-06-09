const express = require("express");
const app = express();
const port = 4000;

function adduser(too, fromm, child, adu, depdate) {
  const mysql = require("mysql2");
  let db = mysql.createConnection({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "tickets",
    port: 3306,
  });
  db.connect(function (err1) {
    let sql =
      "INSERT INTO ticket (too, fromm, depdate, child, adu) VALUES('" +
      too +
      "', '" +
      fromm +
      "', '" +
      depdate +
      "', '" +
      child +
      "', '" +
      adu +
      "')";

    db.query(sql, function (err1, result) {
      if (err1) throw err1;
      console.log("added");
      db.end;
    });
  });
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const { check, validationResult } = require("express-validator");
let formValidation = getFormValidation();

function getFormValidation() {
  return [
    check("password")
      .isLength({ min: 6, max: 30 })
      .withMessage("password must be between 6-30") //length
      .matches("[A-Z]+[A-Za-z0-9]+") //format
      .withMessage("password must have capital letter first")
      .trim()
      .escape(),

    check("firstname")
      .isLength({ min: 2, max: 100 })
      .withMessage("First name must be between 2 and 100 chars.") //length
      .isString() //datatype
      .withMessage("First name must be a string")
      .matches("[A-Za-z]+") //format
      .withMessage("First name must consist of letters only")
      .trim()
      .escape(),

    check("lastname")
      .isLength({ min: 2, max: 100 })
      .withMessage("last name must be between 2 and 100 chars.") //length
      .isString() //datatype
      .withMessage("last name must be a string")
      .matches("[A-Za-z]+") //format
      .withMessage("last name must consist of letters only")
      .trim()
      .escape(),

    check("email")
      .isEmail()
      .withMessage("Email must be in the format x@y.z")
      .trim()
      .escape(),
    check("gender")
      .custom((val) => {
        const whitelist = ["male", "female"];
        if (whitelist.includes(val)) return true;
        return false;
      })
      .withMessage("Selection is not from the provided list")
      .trim()
      .escape(),
  ];
}

app.post("/api", (request, response) => {
  const too1 = request.body.too;
  const from1 = request.body.fromm;
  const depdate1 = request.body.depdate;
  const child1 = request.body.child;
  const adu1 = request.body.adu;

  adduser(too1, from1, child1, adu1, depdate1);

  response.send("Data inserted successfully!");
});

//..............................

function addUserup(firstname, lastname, email, password, gender) {
  const mysql = require("mysql2");
  let db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: "3306",
    database: "tickets",
  });

  db.connect(function (err) {
    //sql command
    let sql = `INSERT INTO user (firstname, lastname,email, password,gender) VALUES ('${firstname}','${lastname}','${email}','${password}','${gender}')`;
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record has been added");
      //close connection
      db.end();
    });
  });
}

app.post("/api2", formValidation, (request, response) => {
  const errors = validationResult(request);
  let msg = "";
  if (!errors.isEmpty()) {
    msg = "<h1> we have error with your submission</h1>";
    msg +=
      printErrors(errors.array()) +
      ".<h1><p><a href='sign.html'>click here</a>to return</p></h1>";

    response.send(msg);
  } else {
    const firstname = request.body.firstname;
    const lastname = request.body.lastname;

    const email = request.body.email;
    const password = request.body.password;

    const gender = request.body.gender;
    addUserup(firstname, lastname, email, password, gender);
    msg =
      "<h1>Thank you, your information has been saved.</h1>" +
      ".<h1><p><a href='home.html'>click here</a>to sign in</p></h1>";
    response.send(msg);
  }

  function printErrors(errArray) {
    let errors = [];
    for (let index = 0; index < errArray.length; index++) {
      let err = errArray[index]["msg"];
      let msg = "<p>-" + err + "</p>";
      errors.push(msg);
    }
    return errors.join("");
  }
});

// for select data (not wworking now)

// app.get("/view", (req, res) => {
//   const query = "SELECT * FROM User";

//   db.query(query, (error, res) => {
//     if (error) throw error;
//     // console.log(result);
//     res.json(result);
//   });
// });

//serving static website
app.use("/", express.static("./website"));

//activating server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
