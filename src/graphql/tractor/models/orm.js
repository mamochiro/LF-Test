import Sequelize from 'sequelize'
import postgres from '../../../config/postgresDB'

const model = postgres.define(
  'tractors',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    farmId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'farms',
        key: 'id'
      }
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
    tableName: 'tractors'
  }
)

export default model
