import { Router } from 'express';

import { getCommentRepository, getLectureRepository } from '../database';
import { Comment } from '../entities/comment';
import userMiddleware from '../middlewares/userMiddleware';


const router = Router();

router.get('/lecture/:uuid', async (req, res) => {
  try {
    const lectureUuid: string = req.params.uuid;
    const comments = await getCommentRepository().find({where: {
      lecture: lectureUuid,
    }});
    res.json(comments);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.use(userMiddleware);

router.post('/lecture/:uuid', async (req, res) => {
  try {
    const lectureUuid: string = req.params.uuid;
    const title: string = req.body.title;
    const body: string = req.body.body;

    const lecture = await getLectureRepository().findOne({where: {
      uuid: lectureUuid,
    }});
    if (!lecture) {
      res.sendStatus(404);
      return;
    }
    const comment = new Comment(req.user, body, lecture);
    comment.title = title;
    const postedComment = await getCommentRepository().save(comment);
    res.json(postedComment);
  } catch (err) {
    res.sendStatus(500);
  }
});

export default router;
