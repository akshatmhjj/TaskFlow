import db from "../db/db.js"

// GET /api/v1/projects
export const getAllProjects = (req, res) => {
	db.query("SELECT * FROM projects", (err, results) => {
		if (err) return res.status(500).json({ error: err.message })
		res.json({ data: results })
	})
}

// GET /api/v1/projects/:id
export const getProjectById = (req, res) => {
	const { id } = req.params
	db.query("SELECT * FROM projects WHERE id = ?", [id], (err, results) => {
		if (err) return res.status(500).json({ error: err.message })
		if (results.length === 0) return res.status(404).json({ message: "Project not found" })
		res.json({ data: results[0] })
	})
}

// POST /api/v1/projects
export const createProject = (req, res) => {
	const { name, description } = req.body
	if (!name) return res.status(400).json({ message: "Project name is required" })

	db.query("INSERT INTO projects (name, description) VALUES (?, ?)", [name, description], (err, result) => {
		if (err) return res.status(500).json({ error: err.message })
		res.status(201).json({ message: "Project created successfully", projectId: result.insertId })
	})
}

export const getProjectAnalytics = (req, res) => {
	const { id } = req.params;
	const sql = `SELECT COUNT(*) AS total_tasks, SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed_tasks, SUM(CASE WHEN status != 'completed' THEN 1 ELSE 0 END) AS pending_tasks FROM tasks WHERE project_id = ? `;
	db.query(sql, [id], (err, results) => {
		if (err) return res.status(500).json({ error: err.message });
		res.json({ data: results[0] });
	}
	);
};
