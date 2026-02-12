// eslint-disable-next-line no-unused-vars
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, primaryKey: true }, // keycloak sub
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  role: {
    type: DataTypes.ENUM('admin', 'developer', 'clinician'),
    allowNull: false,
  },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  timezone: { type: DataTypes.STRING, allowNull: false },
  lastSyncedAt: { type: DataTypes.DATE, allowNull: false },
});

const Issue = sequelize.define(
  'Issue',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },

    type: {
      type: DataTypes.ENUM('bug', 'task', 'subtask', 'story', 'epic'),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        'backlog',
        'in_progress',
        'reviewed',
        'done',
        'archived'
      ),
      allowNull: false,
      defaultValue: 'backlog',
    },

    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
      allowNull: true,
    },

    storyPoints: { type: DataTypes.INTEGER, allowNull: true },

    dueDate: { type: DataTypes.DATE, allowNull: true },

    reporterId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    isArchived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    parentIssueId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    indexes: [
      { fields: ['reporterId'] },
      { fields: ['status'] },
      { fields: ['type'] },
      { fields: ['priority'] },
      { fields: ['parentIssueId'] },
    ],
  }
);

const IssueAssignee = sequelize.define(
  'IssueAssignee',
  {
    issueId: { type: DataTypes.UUID, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false },
  },
  {
    indexes: [
      { unique: true, fields: ['issueId', 'userId'] },
      { fields: ['userId'] }, // for "find all issues assigned to me"
    ],
  }
);

// =============== Associations ===============

// reporter (1 User -> many Issues reported)
Issue.belongsTo(User, { as: 'reporter', foreignKey: 'reporterId' });
User.hasMany(Issue, { as: 'reportedIssues', foreignKey: 'reporterId' });

// assignees (many-to-many)
Issue.belongsToMany(User, {
  through: IssueAssignee,
  as: 'assignees',
  foreignKey: 'issueId',
  otherKey: 'userId',
});

User.belongsToMany(Issue, {
  through: IssueAssignee,
  as: 'assignedIssues',
  foreignKey: 'userId',
  otherKey: 'issueId',
});

// parent/subIssues (self reference)
Issue.belongsTo(Issue, { as: 'parent', foreignKey: 'parentIssueId' });
Issue.hasMany(Issue, { as: 'subIssues', foreignKey: 'parentIssueId' });

export { User, Issue, IssueAssignee };
