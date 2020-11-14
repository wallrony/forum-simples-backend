import express from 'express';
import AuthController from '../data/controllers/AuthController';

import UsersController from '../data/controllers/UsersController';

const accountsRouter = express.Router();

accountsRouter.route('/users/:user_id')
  .get(UsersController.show)
  .put(UsersController.edit)
  .delete(UsersController.delete)

accountsRouter.post('/register', UsersController.add);
accountsRouter.post('/login', AuthController.login);

export default accountsRouter;
