import { Router } from 'express';

import { getLectureRepository } from '../database';
import { User } from '../entities/user';
import { Lecture } from '../entities/lecture';

const lectureRouter = Router();

const censorUserMap = (user: User) => {
	user.hashedPassword = undefined;
	return user;
}


lectureRouter.get('/', async (req, res) => {
  const lectures = (await getLectureRepository().find()).map((lecture) => {
  	lecture.owner = censorUserMap(lecture.owner)
  });

  res.json(lectures);
});

lectureRouter.get('/:uuid', async (req, res) => {
  const lecture = await getLectureRepository().findOne({where: {
  	uuid: req.params.uuid
  }});
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

export default lectureRouter;
