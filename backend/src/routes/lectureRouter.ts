import { Router } from 'express';

import { getLectureRepository } from '../database';
import { User } from '../entities/user';
import { Lecture } from '../entities/lecture';
import userMiddleware from '../middlewares/userMiddleware';

import fs from 'fs'
import path from 'path'

const lectureRouter = Router();

const censorUserMap = (user: User) => {
	user.hashedPassword = undefined;
	return user;
}


lectureRouter.get('/', async (req, res) => {
  const lectures = (await getLectureRepository().find());
  lectures.forEach((lecture) => {
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

lectureRouter.get('/:uuid/vods', async (req, res) => {
  const lecture = await getLectureRepository().findOne({where: {
    uuid: req.params.uuid
  }});
  if(lecture === undefined) {
    res.status(404)
    res.send()
    return
  }

  if(fs.existsSync(`/var/vods/live/${req.params.uuid}`)) {
    res.json(fs.readdirSync(`/var/vods/live/${req.params.uuid}`).map((vod: string) => {
      return {
        uuid: req.params.uuid,
        fileName: vod,
        path: `/vods/live/${req.params.uuid}/${vod}`
      }
    }))
  } else {
    res.status(404)
    res.send(`No vods available`)
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
    await getLectureRepository().save({
      owner,
      name,
      description,
      start,
      end
    });
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

export default lectureRouter;
