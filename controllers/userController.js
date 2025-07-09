import db from "../db/db.js"

// GET /api/v1/users
export const getAllUsers = (req, res) => {
	db.query("SELECT * FROM users", (err, results) => {
		if (err) return res.status(500).json({ error: err.message })
		res.json({ data: results })
	})
}

// POST /api/v1/users
export const createUser = (req, res) => {
	const { name, email } = req.body
	if (!name || !email) return res.status(400).json({ message: "Name and email are required" })

	db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, result) => {
		if (err) return res.status(500).json({ error: err.message })
		res.status(201).json({ message: "User created successfully", userId: result.insertId })
	})
}

// GET /api/v1/projects/:id/members
export const getMembersByProjectId = (req, res) => {
	const { id } = req.params

	const sql = ` SELECT u.id, u.name, u.email FROM users u JOIN project_members pm ON u.id = pm.user_id WHERE pm.project_id = ? `

	db.query(sql, [id], (err, results) => {
		if (err) return res.status(500).json({ error: err.message })
		res.json({ data: results })
	})
}
