const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Employee } = require('../models/employees.model');
const { Op } = require('sequelize'); 

require('dotenv').config();

// Register function
const register = async (req, res) => {
    try {
        const { name, email, password, role, designation, department, mobile, profile_pic } = req.body;

        console.log("Request body:", req.body);

        const existingEmployee = await Employee.findOne({ where: { email } });
        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee already registered with this email.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new employee
        const employee = await Employee.create({
            name,
            email,
            password: hashedPassword,
            role,
            designation,
            department,
            mobile,
            profile_pic:null
        });

        res.status(201).json({ message: 'Employee registered successfully!', employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Login function
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the employee by email
        const employee = await Employee.findOne({ where: { email } });
        if (!employee) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: employee.id, email: employee.email, role: employee.role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(200).json({ message: 'Login successful!', token, employee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};



// Get all employees
const getAllEmployees = async (req, res) => {
    try {
        // Get the token from the Authorization header (Bearer token)
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"
        if (!token) {
            return res.status(401).json({ message: 'No token provided' }); // If no token, return unauthorized
        }

        // Verify and decode the token to extract user data
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token with secret
        const { role } = decoded; // Extract the role from the decoded JWT

        // If the user is not an admin, return 403 Forbidden
        if (role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Only admins can fetch employee data.' });
        }

        // If the user is an admin, fetch all employees excluding the ones with role 'admin'
        const employees = await Employee.findAll({
            where: {
                role: { [Op.ne]: 'admin' } // Exclude employees with the role 'admin'
            }
        });

        // Return the list of employees to the admin
        res.status(200).json({ employees });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' }); // Return error if something goes wrong
    }
};

module.exports = {register, login, getAllEmployees };
