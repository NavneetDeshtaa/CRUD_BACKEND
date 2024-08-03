"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.addUser = exports.login = exports.register = void 0;
const user_1 = __importDefault(require("../model/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = require('jsonwebtoken');
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    try {
        const user = new user_1.default({ username, password: hashedPassword, email });
        yield user.save();
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        res.status(400).json({ error: 'Error registering user' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'User with this usename does not exist . Register to continue' });
        }
        if (!(yield bcryptjs_1.default.compare(password, user.password))) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const payload = { id: user.id };
        const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token, message: " Login Successful" });
    }
    catch (error) {
        res.status(400).json({ error: 'Error logging in' });
    }
});
exports.login = login;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    try {
        const user = new user_1.default({ username, email, password: hashedPassword });
        yield user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Error adding user' });
    }
});
exports.addUser = addUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        const user = yield user_1.default.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Error fetching user' });
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user;
    const { email } = req.body;
    if (!userId) {
        return res.status(400).json({ message: 'User ID not found in token' });
    }
    // Find the user by ID and update
    const user = yield user_1.default.findByIdAndUpdate(userId, { email }, { new: true });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user });
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        const user = yield user_1.default.findOneAndDelete({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ error: 'Error deleting user' });
    }
});
exports.deleteUser = deleteUser;
