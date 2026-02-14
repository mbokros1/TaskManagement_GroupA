import { Issue } from '../models/models.js';

export const createIssue = async (req, res) => {
  try {
    const {
      issueType,
      summary,
      description,
      assignee,
      priority,
      labels,
      sprint,
      storyPoints,
      dueDate,
    } = req.body;

    const issue = await Issue.create({
      issueType,
      summary,
      description,
      assignee,
      priority,
      labels,
      sprint,
      storyPoints,
      dueDate,
    });

    res.status(201).json({
      success: true,
      ticket,
    });
  } catch (err) {
    console.error('Error creating ticket:', err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const getIssueByID = async (req, res) => {
  try {
    const { id } = req.query;
    const where = {};

    if (id) {
      where.id = id;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// _req and _res used so linter does not flag unused variables in stub functions

export const updateIssue = async (_req, _res) => {};

export const deleteIssue = async (_req, _res) => {};
