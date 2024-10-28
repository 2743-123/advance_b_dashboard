import { Request, Response } from 'express';
import User from '../models/User';

// Function to get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users); // Send the users list
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' }); // Handle error
  }
};

// Function to delete a user
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' }); // Send response if user not found
    } else {
      await user.destroy();
      res.json({ message: 'User deleted' }); // Send success response
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' }); // Handle error
  }
};
