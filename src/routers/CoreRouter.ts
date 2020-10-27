import express from 'express';

import PostsController from '../data/controllers/PostsController';
import PostLikeController from '../data/controllers/PostLikeController';

const coreRouter = express.Router();

coreRouter.get('/posts', PostsController.index);
coreRouter.post('/users/:user_id/posts', PostsController.add)
coreRouter.route('/users/:user_id/posts/:post_id')
  .put(PostsController.edit)
  .delete(PostsController.delete);

coreRouter.put('/users/:user_id/posts/:post_id/like', PostsController.like)
coreRouter.put('/users/:user_id/posts/:post_id/unlike', PostsController.unlike)

coreRouter.delete('/users/:user_id/posts/:post_id/remove-like', PostLikeController.delete)

export default coreRouter;
