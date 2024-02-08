const express = require("express");
const authMiddleware = require("../middleware");
const z = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { User, Account } = require("../database/Schema");
const { JWT_SECRET } = require("../config");

const router = express.Router();

//signup router
const signupValidationSchema = z.object({             //checking by zod library
  username: z.string().email(),
  password: z.string().min(8),
  firstName: z.string(),
  lastName: z.string(),
});

router.post("/signup", async (req, res) => {
  const validation = signupValidationSchema.safeParse(req.body);
  const { success } = validation;
  if (!success) {
    return res.status(400).json({
      msg: "invalid input",
      validation,
    });
  }

  const existingUser = await User.findOne({ username: req.body.username });

  if (existingUser) {
    return res.status(409).json({
      msg: "username already taken!",
    });
  }

  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);    //making user password into hash code

    try {
      const user = await User.create({
        username: req.body.username,
        password: hashPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      });

      const account = await Account.create({
        userId: user._id,
        balance: parseFloat((Math.random() * 10000 + 1)),
      });

      res.status(200).json({
        msg: "user created successfully",
      });

    } 
    catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  } 
  catch (err) {
    return res.status(201).json({
      msg: "password could not be encrypted!",
    });
  }
});

//signin route
const signinValidationSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});

router.post("/signin", async function (req, res) {
  const { success } = signinValidationSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      msg: "Invalid Input",
    });
  }

  try {
    const findUser = await User.findOne({ username: req.body.username });

    if (!findUser)
      return res.status(404).json({
        msg: "Username not found",
      });

    let passwordMatch = await bcrypt.compare(
      req.body.password,
      findUser.password
    );
    if (!passwordMatch) {
      return res.status(401).json({
        msg: "Password does not match",
      });
    }

    // CREAte jwt token,

    const token = jwt.sign(
      {
        userId: findUser._id,
        username: findUser.username,
      },
      JWT_SECRET
    );

    res.status(200).json({
      msg: "Login Successfully",
      token: token,
      firstName: findUser.firstName,
    });
  } catch (err) {
    res.status(500).json({
      err,
    });
  }
});


//getting list users
router.get("/bulk", authMiddleware, async function (req, res) {
  const filter = req.query.filter || "";

  console.log(req.userId);

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.status(200).json({
    users: users.filter((user) => {
      if (req.username !== user.username)
        return {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id,
        };
    }),
  });
});

module.exports = router;