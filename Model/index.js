const Sequelize = require("sequelize");
const config = require("../config/db").development;
const pg = require("pg")

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    dialetModule:pg,
    port: config.port, 
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, 
      },
    },
    logging: console.log, 
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./userModel")(sequelize, Sequelize);
db.Organisation = require("./organisation")(sequelize, Sequelize);

// Define associations
db.User.belongsToMany(db.Organisation, { through: "UserOrganisations" });
db.Organisation.belongsToMany(db.User, { through: "UserOrganisations" });

module.exports = db;