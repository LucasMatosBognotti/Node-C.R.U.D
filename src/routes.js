import { Router } from 'express';

const routes = new Router();

import UserController from './app/controllers/UserController';

routes.post('/users', UserController.store);

routes.get('/users', UserController.index);

routes.get('/users/:id', UserController.show);

routes.put('/users/:id', UserController.update);

routes.delete('/users/:id', UserController.delete);

export default routes;