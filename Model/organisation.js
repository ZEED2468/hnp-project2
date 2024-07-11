module.exports = (sequelize, Sequelize) => {
  const Organisation = sequelize.define("organisations", {
    orgId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
  });

  return Organisation;
};
