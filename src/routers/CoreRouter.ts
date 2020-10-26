import express from 'express';

import PostsController from '../data/controllers/PostsController';
import PostLikesController from '../data/controllers/PostLikesController';

const coreRouter = express.Router();

coreRouter.get('/posts', PostsController.index);
coreRouter.post('/users/:user_id/posts', PostsController.add)
coreRouter.route('/users/:user_id/posts/:post_id')
  .put(PostsController.edit)
  .delete(PostsController.delete);

coreRouter.route('/users/:user_id/posts/:post_id/like')
  .post(PostLikesController.add)
  .put(PostLikesController.edit)
  .delete(PostLikesController.delete)

export default coreRouter;
