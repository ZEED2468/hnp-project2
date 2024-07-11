const db = require("../Model");
const { v4: uuidv4 } = require("uuid");


exports.getSingleOrganisation = async (req, res) => {
  try {
    const organisation = await db.Organisation.findOne({
      where: { orgId: req.params.orgId },
      include: db.User,
    });
    if (!organisation) {
      return res.status(404).json({ message: "Organisation not found" });
    }
    res.status(200).json({ status: "success", data: organisation });
  } catch (error) {
    res.status(400).json({
      message: "Error fetching organisation",
    });
  }
};


exports.addUserToOrganisation = async (req, res) => {
  const { userId } = req.body;
  try {
    const organisation = await db.Organisation.findOne({
      where: { orgId: req.params.orgId },
    });
    const user = await db.User.findOne({ where: { userId } });

    if (!organisation || !user) {
      return res.status(404).json({ message: "Organisation or User not found" });
    }

    await organisation.addUser(user);

    res.status(200).json({
      status: "success",
      message: "User added to organisation successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: "Error adding user to organisation",
    });
  }
};
