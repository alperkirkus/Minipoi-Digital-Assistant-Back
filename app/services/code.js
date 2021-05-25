const express = require("express");
const db = require("../models");
const Op = db.Sequelize.Op;

// Middlewares
const auth = require("../middlewares/auth");

//auth
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");

//Roles
const { UserRolls } = require("../helpers/enum");

const app = express.Router();

//**************Route Level 1

//add book with code
app.post("/add-book", async (req, res) => {
  const { userId, code } = req.body;

  console.log(code, userId, "wwwww");

  db.Code.findOne({
    where: {
      bookRegistrationCode: code,
      isUsed: false,
    },
  })
    .then((code) => {
      if (code) {
        db.UBook.create({
          userId,
          bookId: code.bookId,
        })
          .then(() => {
            return res.json({
              type: true,
              msg: "success",
            });
          })
          .catch((e) => {
            return res.json({
              type: false,
              data: e.toString(),
            });
          });
      } else {
        return res.json({
          type: false,
          msg: "Code already uses",
        });
      }
    })
    .catch((e) => {
      return res.json({
        type: false,
        data: e.toString(),
      });
    });
});

module.exports = app;
