import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload'
import OrphanagesController from './controllers/OrphanagesController';

const routes = Router();
const upload = multer(uploadConfig);

// CONVENÇÃO
// index, show, create, update, dlete

routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);
// em upload pode fazer de um ou varios arquivos
routes.post('/orphanages', upload.array('orphanage_images') , OrphanagesController.create);

export default routes;