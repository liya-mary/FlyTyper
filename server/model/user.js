module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    wpm: {
      type: DataTypes.INTEGER,
    }
  }, {
    tableName: 'users',
    timestamps: true
  });

  return User;
};