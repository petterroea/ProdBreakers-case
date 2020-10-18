import { Router } from 'express';

import { getLectureRepository } from '../database';
import { User } from '../entities/user';
import { Lecture } from '../entities/lecture';
import userMiddleware from '../middlewares/userMiddleware';

const lectureRouter = Router();

const censorUserMap = (user: User) => {
	user.hashedPassword = undefined;
	return user;
}


lectureRouter.get('/', async (req, res) => {
  const lectures = (await getLectureRepository().find());
  lectures.forEach((lecture) => {
    if (lecture.owner) {
      lecture.owner = censorUserMap(lecture.owner);
    }
  });

  res.json(lectures);
});

lectureRouter.get('/:uuid', async (req, res) => {
  const lecture = await getLectureRepository().findOne({
    where: {
      uuid: req.params.uuid
    },
    relations: ['recordings']
  });
  if(lecture === undefined) {
    res.status(404)
    res.send()
  }
  else {
    if(lecture.owner !== undefined) {
      lecture.owner.hashedPassword = undefined;
    }
    res.json(lecture);
  }
});

lectureRouter.use(userMiddleware);

lectureRouter.put('/', async (req, res) => {
  const body: Lecture = req.body;
  try {
    const owner: User = req.user;
    const {
      name,
      description,
      start,
      end,
    } = body;
    const newLecture = new Lecture(owner, name, description, start, end)
    await getLectureRepository().save(newLecture);
    res.json(newLecture)
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

export default lectureRouter;
