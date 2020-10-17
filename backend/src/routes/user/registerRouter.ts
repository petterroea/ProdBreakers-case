import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { getUserRepository } from '../../database';
import { User, hashPassword, UserType } from '../../entities/user';

const JWT_KEY = process.env.JWT_KEY ?? 'flugelhorn';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const username: string = req.body.username;
    const password: string = req.body.password;
    const fullName: string = req.body.fullName;
    const isLecturer: boolean = req.body.isLecturer
    // TODO: (?) verify that no user with this username exists
    const user: User = await getUserRepository().save({
      username,
      hashedPassword: hashPassword(password),
      fullName: fullName || username,
      userType: isLecturer ? UserType.Lecturer : UserType.User,
    });
    user.hashedPassword = undefined;
    const token = jwt.sign({ userId: user.id }, JWT_KEY);
    res.json({
      user,
      token
    });
  } catch (e) {
    res.sendStatus(500);
  }
});

export default router;
