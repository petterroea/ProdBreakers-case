import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { getUserRepository } from '../../database';
import { User, hashPassword, UserType } from '../../entities/user';

const JWT_KEY = process.env.JWT_KEY ?? 'flugelhorn';

const router = Router();

router.put('/', async (req, res) => {
  try {
    const username: string = req.body.username;
    const password: string = req.body.password;
    const fullName: string = req.body.fullName;
    const isLecturer: boolean = req.body.isLecturer
    const existingUser: User = await getUserRepository().findOne({
      username,
    });
    if (existingUser) {
      res.sendStatus(403);
      return;
    }
    const user: User = await getUserRepository().save({
      username,
      hashedPassword: hashPassword(password),
      fullName: fullName || username,
      userType: isLecturer ? UserType.Lecturer : UserType.User,
    });
    user.hashedPassword = undefined;
    const token = jwt.sign({ userId: user.uuid }, JWT_KEY);
    res.json({
      user,
      token
    });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

export default router;
