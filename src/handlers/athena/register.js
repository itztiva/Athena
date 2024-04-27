import Express from 'express'
import { CreateId, registerUser } from '../../functions/functions/functions.js';

const express = Express()

express.get("/register", async (req, res) => {
    const { username, email, password } = req.query;
 
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Missing required parameters" });
    }

    if (email) return res.send("An account already exists with this info"); 

    try {
        const result = await registerUser(username, email, password);
 
        return res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "An error occurred while registering user" });
    }
 });

export default express