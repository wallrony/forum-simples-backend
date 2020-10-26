import express from 'express';

import accountsRouter from './AccountsRouter';
import coreRouter from './CoreRouter';

const apiRestRouter = express.Router();

apiRestRouter.use('/accounts', accountsRouter);
apiRestRouter.use('/core', coreRouter);

export default apiRestRouter;
