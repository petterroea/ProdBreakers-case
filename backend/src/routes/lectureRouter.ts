import { Router } from 'express';

import { getLectureRepository } from '../database';
import { User } from '../entities/user';
import { Lecture } from '../entities/lecture';

import fs from 'fs'
import path from 'path'

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



export default lectureRouter;
