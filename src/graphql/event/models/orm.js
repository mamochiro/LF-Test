import Sequelize from 'sequelize'
import postgres from '../../../config/postgresDB'

const model = postgres.define(
  'events',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    gardenId: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: 'gardens',
        key: 'id'
      }
    },
    name: {
      type: Sequelize.STRING
    },
    area: {
      type: Sequelize.FLOAT
    },
    cost: {
      type: Sequelize.FLOAT
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
    tableName: 'events'
  }
)

export default model
