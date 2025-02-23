const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const env = require("dotenv")
env.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || "sql12.freesqldatabase.com",
    user: process.env.DB_USER || "sql12763774",
    password: process.env.DB_PASSWORD || "LXbafLrYim",
    database: process.env.DB_NAME || "sql12763774"
});

db.connect((error)=> {
    if (error) {
        console.log("Error connecting to database and server");
        console.log(error)
    }
    else {
        app.listen(8000, () => {
            console.log("Server connected to port 8000 and DB connected");
        });
    }
})

app.post("/register",(req,res)=> {
    try {
        const {name, id, email, phone, department, doj, role} = req.body;
        const getidquery = "SELECT * FROM employees WHERE id = ? OR email = ?";
        db.query(getidquery,[id,email],(err,result)=>{
            if (err) {
                console.log("Error checking existing records"+err);
                return res.status(404).send({ok: false, message: "Error getting employee details"});
            }
            else {
                if (result.length > 0) {
                    const existingEmp = result[0];
                    if (existingEmp.id == id) {
                        return res.status(404).send({ok: false, message: "Employee id already exist"});
                    }
                    else if (existingEmp.email == email) {
                        return res.status(404).send({ok: false, message: "Employee email already exist"});
                    }
                }
            }

            const insertquery = "INSERT INTO employees (name, id, email, phone, department, doj, role) VALUES (?, ?, ?, ?, ?, ?, ?)";
            db.query(insertquery,[name, id, email, phone, department, doj, role],(err,result)=>{
                if (err) {
                    console.log("Error inserting employee records"+err);
                    return res.status(404).send({ok: false, message: "Error inserting employee details"});
                }
                else {
                    res.status(200).json({ok: true, message: "student register successfully"});
                }
            })
        })
    } catch (error) {
        return res.status(500).send({ok: false, message: "Error registering employee data"})
    }
})