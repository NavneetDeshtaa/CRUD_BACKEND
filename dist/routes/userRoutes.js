"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const jwtTokens_1 = __importDefault(require("../auth/jwtTokens"));
const router = (0, express_1.Router)();
router.post('/registers', userController_1.register);
router.post('/login', userController_1.login);
router.post('/add', userController_1.addUser);
router.get('/:username', jwtTokens_1.default, userController_1.getUser);
router.put('/:username', jwtTokens_1.default, userController_1.updateUser);
router.delete('/:username', jwtTokens_1.default, userController_1.deleteUser);
exports.default = router;
