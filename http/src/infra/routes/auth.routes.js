import { Router } from 'express';
import JwtUtil from '../../utils/JwtUtil';

const authRouter = Router();

authRouter.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'usuario' && password === 'senha') {
    const token = new JwtUtil().encode(username);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Username and/or password not found' });
  }
});

export default authRouter;
