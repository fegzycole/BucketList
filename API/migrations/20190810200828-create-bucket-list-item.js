module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('BucketListItems', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    date_created: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    date_modified: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    done: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    bucketListId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'BucketLists',
        key: 'id',
        as: 'bucketListId',
      },
    },
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('BucketListItems'),
};
