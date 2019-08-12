module.exports = (sequelize, DataTypes) => {
  const BucketListItem = sequelize.define('BucketListItem', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    createdAt: 'date_created',
    updatedAt: 'date_modified',
  });

  BucketListItem.associate = (models) => {
    BucketListItem.belongsTo(models.BucketList, {
      foreignKey: 'bucketListId',
      onDelete: 'CASCADE',
    });
  };

  return BucketListItem;
};
