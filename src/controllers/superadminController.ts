import { Request, Response } from 'express';
import User from '../models/User';


export const promoteToAdmin = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    // Attempt to update the user's role directly in the database
    const [updatedRows] = await User.update(
      { role: 'admin' },
      { where: { id: userId } }
    );

    // Check if the update was successful
    if (updatedRows === 0) {
      res.status(404).json({ error: 'User not found or already an admin' });
      return;
    }

    // Re-fetch the updated user data from the database
    const updatedUser = await User.findByPk(userId);

    // Confirm and log the updated user details
    console.log('Updated User:', updatedUser);

    // Send a response with the updated user data
    res.json({ message: 'User promoted to admin', updatedUser });
  } catch (error) {
    console.error('Error promoting user:', error);
    res.status(500).json({ error: 'Failed to promote user' });
  }
};