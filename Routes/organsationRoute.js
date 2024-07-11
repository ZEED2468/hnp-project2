const express = require("express");
const {
  getSingleOrganisation,
  addUserToOrganisation,
} = require("../controller/organisationController");
const {authenticate } = require("../Middleware/auth");

const router = express.Router();


router.get("/:orgId",authenticate, getSingleOrganisation);

router.post("/:orgId/users", authenticate, addUserToOrganisation);

module.exports = router;
