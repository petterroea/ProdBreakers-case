import { Router } from 'express';

import { getCommentRepository, getLectureRepository } from '../database';
import { Comment } from '../entities/comment';
import userMiddleware from '../middlewares/userMiddleware';


const router = Router();

const getReplies = async (comment: Comment): Promise<Comment[]> => {
  return await getCommentRepository().find({where: {
    thread: comment
  }});
};

router.get('/:uuid', async (req, res) => {
  try {
    const uuid: string = req.params.uuid;
    const comment: Comment = await getCommentRepository().findOne({where: {
      uuid,
    }});
    if (!comment) {
      res.sendStatus(404);
      return;
    }
    const children: Comment[] = await getReplies(comment);
    comment.children = children;
    res.json(comment);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/lecture/:uuid', async (req, res) => {
  try {
    const lectureUuid: string = req.params.uuid;
    const comments = await getCommentRepository().find({where: {
      lecture: lectureUuid,
      thread: null,
    }});
    res.json(comments);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/reply/:uuid', async (req, res) => {
  try {
    const parentCommentUuid: string = req.params.uuid;
    const parentComment: Comment = await getCommentRepository().findOne({where: {
      uuid: parentCommentUuid,
    }});
    if (!parentComment) {
      res.sendStatus(404);
      return;
    }
    const replies = await getReplies(parentComment);
    res.json(replies);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.use(userMiddleware);

router.put('/lecture/:uuid', async (req, res) => {
  try {
    const lectureUuid: string = req.params.uuid;
    const title: string | undefined = req.body.title;
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

router.put('/reply/:uuid', async (req, res) => {
  try {
    const parentCommentUuid: string = req.params.uuid;
    const title: string | undefined = req.body.title;
    const body: string = req.body.body;
    const parentComment: Comment = await getCommentRepository().findOne({
      where: {
        uuid: parentCommentUuid,
      }
    });
    if (!parentComment) {
      res.sendStatus(404);
      return;
    }
    if (parentComment.thread) {
      res.sendStatus(403);
    }
    const newComment: Comment = new Comment(req.user, body, parentComment.lecture);
    newComment.thread = parentComment;
    newComment.title = title;
    const postedReply = await getCommentRepository().save(newComment);
    res.json(postedReply);
  } catch (err) {
    res.sendStatus(500);
  }
});

export default router;
