import Sequelize from 'sequelize'
import postgres from '../../../config/postgresDB'

const model = postgres.define(
  'users',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    firstName: {
      type: Sequelize.STRING(50)
    },
    lastName: {
      type: Sequelize.STRING(50)
    },
    email: {
      type: Sequelize.STRING(100),
      unique: true
    },
    password: {
      type: Sequelize.STRING(255)
    },
    type: {
      type: Sequelize.ENUM('ADMIN', 'OWNER', 'WORKER'),
      allowNull: false
    },
    gender: {
      type: Sequelize.ENUM('MALE', 'FEMALE'),
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  },
  {
    timestamps: true,
    paranoid: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    tableName: 'users'
  }
)

export default model
