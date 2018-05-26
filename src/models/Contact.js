module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 20],
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 40],
      },
    },
    phoneNumber: DataTypes.BIGINT,
  }, {});
  Contact.associate = (models) => {
    // associations can be defined here
  };
  return Contact;
};
