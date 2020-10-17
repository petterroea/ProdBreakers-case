import { Router } from 'express';

import { getCommentRepository } from '../database';

const router = Router();

router.get('/fromLecture/:uuid', async (req, res) => {
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

export default router;
