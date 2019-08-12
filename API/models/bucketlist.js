module.exports = (sequelize, DataTypes) => {
  const BucketList = sequelize.define('BucketList', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    createdAt: 'date_created',
    updatedAt: 'date_modified',
  });

  BucketList.associate = (models) => {
    BucketList.belongsTo(models.User, {
      foreignKey: 'created_by',
      onDelete: 'CASCADE',
    });
    BucketList.hasMany(models.BucketListItem, {
      foreignKey: 'bucketListId',
      as: 'Items',
    });
  };

  return BucketList;
};
