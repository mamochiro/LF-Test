import Sequelize from 'sequelize'
import postgres from '../../../config/postgresDB'

const clientModel = postgres.define(
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
      type: Sequelize.ENUM,
      values: ['ADMIN', 'OWNER']
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

export default clientModel
