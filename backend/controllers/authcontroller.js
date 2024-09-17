import User, { findOne } from '../models/user';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';


export async function register(req, res) {
  const { username, email, password } = req.body;
  try {
    let user = await findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ username, email, password: await hash(password, 10) });
    await user.save();

    const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
}


export async function login(req, res) {
  const { email, password } = req.body;
  try {
    let user = await findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User does not exist' });

    const isMatch = await compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
}
