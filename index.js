// // const express = require("express");
// // const mongoose = require("mongoose");
// // const bcrypt = require("bcryptjs");
// // const jwt = require("jsonwebtoken");
// // const cors = require("cors");
// // const dotenv = require("dotenv");

// // const Student = require("./models/Student");
// // const auth = require("./middleware/auth");

// // dotenv.config();

// // const app = express();

// // app.use(express.json());
// // app.use(cors());

// // /*
// // MongoDB Connection
// // */
// // mongoose.connect(process.env.MONGO_URI)
// // .then(() => console.log("MongoDB Connected"))
// // .catch((err) => console.log(err));

// // /*
// // REGISTER API
// // POST /api/register
// // */
// // app.post("/api/register", async (req, res) => {
// //     try {
// //         const { name, email, password, course } = req.body;

// //         let student = await Student.findOne({ email });

// //         if (student) {
// //             return res.status(400).json({
// //                 message: "Email already exists"
// //             });
// //         }

// //         const hashedPassword = await bcrypt.hash(password, 10);

// //         student = new Student({
// //             name,
// //             email,
// //             password: hashedPassword,
// //             course
// //         });

// //         await student.save();

// //         res.json({
// //             message: "Student Registered Successfully"
// //         });

// //     } catch (error) {
// //         res.status(500).json({
// //             message: error.message
// //         });
// //     }
// // });

// // /*
// // LOGIN API
// // POST /api/login
// // */
// // app.post("/api/login", async (req, res) => {
// //     try {
// //         const { email, password } = req.body;

// //         const student = await Student.findOne({ email });

// //         if (!student) {
// //             return res.status(400).json({
// //                 message: "Invalid Credentials"
// //             });
// //         }

// //         const isMatch = await bcrypt.compare(password, student.password);

// //         if (!isMatch) {
// //             return res.status(400).json({
// //                 message: "Invalid Credentials"
// //             });
// //         }

// //         const token = jwt.sign(
// //             { id: student._id },
// //             process.env.JWT_SECRET,
// //             { expiresIn: "1d" }
// //         );

// //         res.json({
// //             token,
// //             student
// //         });

// //     } catch (error) {
// //         res.status(500).json({
// //             message: error.message
// //         });
// //     }
// // });

// // /*
// // UPDATE PASSWORD
// // PUT /api/update-password
// // */
// // app.put("/api/update-password", auth, async (req, res) => {
// //     try {
// //         const { oldPassword, newPassword } = req.body;

// //         const student = await Student.findById(req.student.id);

// //         const isMatch = await bcrypt.compare(
// //             oldPassword,
// //             student.password
// //         );

// //         if (!isMatch) {
// //             return res.status(400).json({
// //                 message: "Old password incorrect"
// //             });
// //         }

// //         student.password = await bcrypt.hash(newPassword, 10);

// //         await student.save();

// //         res.json({
// //             message: "Password Updated Successfully"
// //         });

// //     } catch (error) {
// //         res.status(500).json({
// //             message: error.message
// //         });
// //     }
// // });

// // /*
// // UPDATE COURSE
// // PUT /api/update-course
// // */
// // app.put("/api/update-course", auth, async (req, res) => {
// //     try {
// //         const { course } = req.body;

// //         const student = await Student.findById(req.student.id);

// //         student.course = course;

// //         await student.save();

// //         res.json({
// //             message: "Course Updated Successfully"
// //         });

// //     } catch (error) {
// //         res.status(500).json({
// //             message: error.message
// //         });
// //     }
// // });

// // app.listen(process.env.PORT, () => {
// //     console.log(`Server running on port ${process.env.PORT}`);
// // });

// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");
// const dotenv = require("dotenv");

// const Student = require("./models/Student");
// const auth = require("./middleware/auth");

// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(cors());

// /*
// MongoDB Connection
// */
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("MongoDB Connected"))
// .catch((err) => console.log(err));

// /*
// HOME ROUTE
// */
// app.get("/", (req, res) => {
//     res.send("Student Auth System Backend Running Successfully 🚀");
// });

// /*
// REGISTER API
// POST /api/register
// */
// app.post("/api/register", async (req, res) => {
//     try {
//         const { name, email, password, course } = req.body;

//         let student = await Student.findOne({ email });

//         if (student) {
//             return res.status(400).json({
//                 message: "Email already exists"
//             });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         student = new Student({
//             name,
//             email,
//             password: hashedPassword,
//             course
//         });

//         await student.save();

//         res.json({
//             message: "Student Registered Successfully"
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// });

// /*
// LOGIN API
// POST /api/login
// */
// app.post("/api/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         const student = await Student.findOne({ email });

//         if (!student) {
//             return res.status(400).json({
//                 message: "Invalid Credentials"
//             });
//         }

//         const isMatch = await bcrypt.compare(password, student.password);

//         if (!isMatch) {
//             return res.status(400).json({
//                 message: "Invalid Credentials"
//             });
//         }

//         const token = jwt.sign(
//             { id: student._id },
//             process.env.JWT_SECRET,
//             { expiresIn: "1d" }
//         );

//         res.json({
//             token,
//             student
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// });

// /*
// UPDATE PASSWORD
// PUT /api/update-password
// */
// app.put("/api/update-password", auth, async (req, res) => {
//     try {
//         const { oldPassword, newPassword } = req.body;

//         const student = await Student.findById(req.student.id);

//         const isMatch = await bcrypt.compare(
//             oldPassword,
//             student.password
//         );

//         if (!isMatch) {
//             return res.status(400).json({
//                 message: "Old password incorrect"
//             });
//         }

//         student.password = await bcrypt.hash(newPassword, 10);

//         await student.save();

//         res.json({
//             message: "Password Updated Successfully"
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// });

// /*
// UPDATE COURSE
// PUT /api/update-course
// */
// app.put("/api/update-course", auth, async (req, res) => {
//     try {
//         const { course } = req.body;

//         const student = await Student.findById(req.student.id);

//         student.course = course;

//         await student.save();

//         res.json({
//             message: "Course Updated Successfully"
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: error.message
//         });
//     }
// });

// app.listen(process.env.PORT, () => {
//     console.log(`Server running on port ${process.env.PORT}`);
// });
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");

const Student = require("./models/Student");
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
    res.send("Student Auth System Backend Running Successfully 🚀");
});

/*
REGISTER API
POST /api/register
*/
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password, course } = req.body;

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
            password: hashedPassword,
            course
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
UPDATE PASSWORD
PUT /api/update-password
*/
app.put("/api/update-password", auth, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const student = await Student.findById(req.student.id);

        const isMatch = await bcrypt.compare(
            oldPassword,
            student.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Old password incorrect"
            });
        }

        student.password = await bcrypt.hash(newPassword, 10);

        await student.save();

        res.json({
            message: "Password Updated Successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

/*
UPDATE COURSE
PUT /api/update-course
*/
app.put("/api/update-course", auth, async (req, res) => {
    try {
        const { course } = req.body;

        const student = await Student.findById(req.student.id);

        student.course = course;

        await student.save();

        res.json({
            message: "Course Updated Successfully"
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