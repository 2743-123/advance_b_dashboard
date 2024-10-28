import express,{ Router,Request, Response} from 'express';
import Users from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';





  

export const generateToken = (user: Partial<Users>) => {
  const payload = {
    id: user.id,
    role: user.role,
  };

  return jwt.sign(payload, process.env.JWT_SECRET || 'your_secret_key', {
    expiresIn: '1h',
  });
};


// interface SignupBody {
//     email: string;
//     password: string;
// }
const router =express.Router();

export const signup = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    // HTTP status code 201 (Created) ke saath response bhejna
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    // Error handling
    res.status(400).json({ error: 'Failed to create user' });
  }

};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } ,raw:true});

    if (!user) {
      // console.error('User not found');
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // console.error('Invalid credentials');
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // console.log('User Object:', user);

    const token = generateToken({
      id: user.id,     // Ensure you're using the correct user ID
      role: user.role, // Ensure you're using the correct user role
    });

    // console.log('Generated Token:', token);

    res.status(200).json({
      message: 'Logged in',
      token,
    });
  } catch (error) {
    // console.error('Internal server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// export default router;
