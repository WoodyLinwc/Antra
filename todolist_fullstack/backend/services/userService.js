const userRepository = require("../repositories/userRepository");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// set a default secret if JWT_SECRET is not defined in .env
const JWT_SECRET = process.env.JWT_SECRET || "default-secret-key";

class UserService {
    signup(userData) {
        if (!userData.username || !userData.password || !userData.email) {
            throw new Error("Username, password, and email are required");
        }

        // check if username and email already exists
        const existingUsername = userRepository.findByUsername(
            userData.username
        );
        if (existingUsername) {
            throw new Error("Username already exists");
        }

        const existingEmail = userRepository.findByEmail(userData.email);
        if (existingEmail) {
            throw new Error("Email already exists");
        }

        return userRepository.create(userData);
    }

    login(credentials) {
        const { username, password } = credentials;

        if (!username || !password) {
            throw new Error("Username and password are required");
        }

        const user = userRepository.findByUsername(username);

        if (!user) {
            throw new Error("Invalid credentials");
        }

        if (user.password !== password) {
            throw new Error("Invalid credentials");
        }

        // generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role,
            },
            JWT_SECRET,
            { expiresIn: "24h" }
        );

        return {
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            token,
        };
    }

    getUserById(id) {
        const user = userRepository.findById(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    }
}

module.exports = new UserService();
