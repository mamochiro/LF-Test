import Sequelize from 'sequelize'
import postgres from '../config/postgresDB'

const clientModel = postgres.define('example', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  message: {
    type: Sequelize.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  tableName: 'example',
})

export default clientModel
