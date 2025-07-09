import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"

import projectRoutes from "./routes/projectRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import userRoutes from './routes/userRoutes.js';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3050

app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/projects", projectRoutes)
app.use("/tasks", taskRoutes)
app.use('/users', userRoutes)

app.get("/", (req, res) => {
	res.send("TaskFlow API is running")
})

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`)
})
