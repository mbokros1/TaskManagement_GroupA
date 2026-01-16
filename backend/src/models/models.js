// eslint-disable-next-line no-unused-vars
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
});

await sequelize.sync();
const Ticket = sequelize.define('Ticket', {
  id: { type: DataTypes.UUID, primaryKey: true },
  title: DataTypes.STRING,
});

await sequelize.sync();
Ticket.belongsTo(User);
User.hasMany(Ticket);

await sequelize.sync();

export { User };
