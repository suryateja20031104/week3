const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const url = "mongodb+srv://suryateja1938102074:suryaamazonintern@cluster0.ldxadbe.mongodb.net/";
const dbName = "nxttrendz";

async function connectToMongoDB_tasks() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log("MongoDB connected successfully.");
    return client.db(dbName).collection("tasks");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

app.post("/addOrUpdateTasks", async (req, res) => {
  const { employeeName, tasks } = req.body;

  if (!employeeName || !tasks || !Array.isArray(tasks)) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    const collection = await connectToMongoDB_tasks();
    const existingEmployee = await collection.findOne({ name: employeeName });

    if (existingEmployee) {
      const updatedTasks = [...existingEmployee.tasks, ...tasks];
      await collection.updateOne(
        { name: employeeName },
        { $set: { tasks: updatedTasks } }
      );
      res.status(200).json({ message: "Tasks updated successfully." });
    } else {
      await collection.insertOne({ name: employeeName, tasks });
      res.status(201).json({ message: "Employee and tasks added successfully." });
    }
  } catch (error) {
    console.error("Error updating tasks:", error);
    res.status(500).json({ error: "An error occurred while updating tasks." });
  }
});

app.get("/getEmployeeTasks/:name", async (req, res) => {
    const { name } = req.params;
  
    try {
      const collection = await connectToMongoDB_tasks();
      const employee = await collection.findOne({ name });
      if (employee) {
        res.status(200).json(employee);
      } else {
        res.status(404).json({ error: "Employee not found" });
      }
    } catch (error) {
      console.error("Error fetching employee tasks:", error);
      res.status(500).json({ error: "An error occurred while retrieving tasks" });
    }
  });

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
