import express from 'express';
import { upload } from '../middleware/multer.middleware.js';
import { clientController, deleteClientController, getClientController, updateClientController } from '../controllers/client.controllers.js';

const router = express.Router();

router.post('/client', upload.single('reviewImage'), clientController);
router.get('/client', getClientController);
router.delete('/client/:id', deleteClientController);
router.put("/client/:id", upload.single('reviewImage'), updateClientController);

export default router;
