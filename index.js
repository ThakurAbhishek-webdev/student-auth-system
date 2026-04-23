const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");

const Student = require("./models/Student");
const Grievance = require("./models/Grievance");
const auth = require("./middleware/auth");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

/*
MongoDB Connection
*/
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

/*
HOME ROUTE
*/
app.get("/", (req, res) => {
    res.send("Student Grievance Management System Backend Running Successfully 🚀");
});

/*
REGISTER API
POST /api/register
*/
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let student = await Student.findOne({ email });

        if (student) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        student = new Student({
            name,
            email,
            password: hashedPassword
        });

        await student.save();

        res.json({
            message: "Student Registered Successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

/*
LOGIN API
POST /api/login
*/
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const student = await Student.findOne({ email });

        if (!student) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, student.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials"
            });
        }

        const token = jwt.sign(
            { id: student._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            token,
            student
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

/*
SUBMIT GRIEVANCE API
POST /api/grievances
*/
app.post("/api/grievances", auth, async (req, res) => {
    try {
        const { title, description, category } = req.body;

        const grievance = new Grievance({
            title,
            description,
            category
        });

        await grievance.save();

        res.json({
            message: "Grievance Submitted Successfully",
            grievance
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

/*
VIEW ALL GRIEVANCES API
GET /api/grievances
*/
app.get("/api/grievances", auth, async (req, res) => {
    try {
        const grievances = await Grievance.find();

        res.json(grievances);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

/*
SEARCH GRIEVANCE API
GET /api/grievances/search?title=xyz
*/
app.get("/api/grievances/search", auth, async (req, res) => {
    try {
        const { title } = req.query;

        const grievances = await Grievance.find({
            title: { $regex: title, $options: "i" }
        });

        res.json(grievances);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

/*
VIEW GRIEVANCE BY ID
GET /api/grievances/:id
*/
app.get("/api/grievances/:id", auth, async (req, res) => {
    try {
        const grievance = await Grievance.findById(req.params.id);

        res.json(grievance);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

/*
UPDATE GRIEVANCE
PUT /api/grievances/:id
*/
app.put("/api/grievances/:id", auth, async (req, res) => {
    try {
        const { title, description, category, status } = req.body;

        const grievance = await Grievance.findByIdAndUpdate(
            req.params.id,
            {
                title,
                description,
                category,
                status
            },
            { new: true }
        );

        res.json({
            message: "Grievance Updated Successfully",
            grievance
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

/*
DELETE GRIEVANCE
DELETE /api/grievances/:id
*/
app.delete("/api/grievances/:id", auth, async (req, res) => {
    try {
        await Grievance.findByIdAndDelete(req.params.id);

        res.json({
            message: "Grievance Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});