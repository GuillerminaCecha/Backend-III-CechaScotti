import { Router } from 'express';
import { AdoptionController } from '../controllers/adoption.controller';

const adoptionController = new AdoptionController();
export const router = Router();

router.get('/', adoptionController.getAllAdoptions);
router.get('/:aid', adoptionController.getAdoptionById);
router.post('/user/:uid/pet/:pid', adoptionController.createAdoption);
// router.post("/withimage", uploader.single("image"), petsController.createPetWithImage);
router.put('/:aid/user/:uid/pet/:pid', adoptionController.updateAdoption);
router.delete('/:aid', adoptionController.deleteAdoption);