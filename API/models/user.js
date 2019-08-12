module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: 'date_created',
    updatedAt: 'date_modified',
  });

  User.associate = (models) => {
    User.hasMany(models.BucketList, {
      foreignKey: 'created_by',
      as: 'created_by',
    });
  };

  return User;
};
