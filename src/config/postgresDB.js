import Sequelize from 'sequelize'

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT,
} = process.env

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT || 5432,
  dialect: DB_DIALECT || 'postgres',
  logging: false,
  operatorsAliases: false,
})

export default sequelize
