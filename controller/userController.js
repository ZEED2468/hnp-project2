const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../Model");
const { v4: uuidv4 } = require("uuid");

exports.register = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  try {
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(422).json({
        msg: { message: "User with this email already exists in the database" },
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.User.create({
      userId: uuidv4(),
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });

    const orgName = `${firstName}'s Organisation`;
    const organisation = await db.Organisation.create({
      orgId: `${user.userId}-org`,
      name: orgName,
      description: "Default organisation",
    });

    await user.addOrganisation(organisation);

    const token = jwt.sign({ id: user.userId }, process.env.JWT_TOKEN, {
      expiresIn: "20h",
    });

    res.status(201).json({
      status: "success",
      msg: "Registration successful",
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Registration unsuccessful" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign({ id: user.userId }, process.env.JWT_TOKEN, {
      expiresIn: "10h",
    });

    res.status(200).json({
      status: "success",
      msg: "Login successful",
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Login unsuccessful" });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await db.User.findOne({
      where: { userId },
      attributes: ["userId", "firstName", "lastName", "email", "phone"],
      include: [
        {
          model: db.Organisation,
          through: { attributes: [] },
        },
      ],
    });

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "User details retrieved successfully",
      data: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};
