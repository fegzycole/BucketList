module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('BucketLists', {
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
    created_by: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'created_by',
      },
    },
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('BucketLists'),
};
