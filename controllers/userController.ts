import { Request, Response } from 'express';
import User from '../model/user';
import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');

export const register = async (req: Request, res: Response) => {

  const { username, password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ username, password:hashedPassword, email });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(400).json({ error: 'Error registering user' });
  }
};

 export const login = async (req: Request, res: Response) => {

  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user ) {
      return res.status(400).json({ error: 'User with this usename does not exist . Register to continue' });
    }

    if(!(await bcrypt.compare(password, user.password))){
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token, message:" Login Successful" });

  } catch (error) {
    res.status(400).json({ error: 'Error logging in' });
  }
};

 export const addUser = async (req: Request, res: Response) => {

  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ username, email, password:hashedPassword });
    await user.save();
    
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error adding user' });
  }
};

 export const getUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching user' });
  }
};

 export const updateUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  const updates = req.body;
  try {
    const user = await User.findOneAndUpdate({ username }, updates, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Error updating user' });
  }
};

 export const deleteUser = async (req: Request, res: Response) => {
  const { username } = req.params;
  try {
    const user = await User.findOneAndDelete({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error deleting user' });
  }
};


