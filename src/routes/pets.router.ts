import { Router } from 'express';
import { PetsController } from '../controllers/pet.controller';

const petsController = new PetsController();
export const router = Router();

router.get('/', petsController.getAllPets);
router.get('/:pid', petsController.getPetById);
router.post('/', petsController.createPet);
// router.post("/withimage", uploader.single("image"), petsController.createPetWithImage);
router.put('/:pid', petsController.updatePet);
router.delete('/:pid', petsController.deletePet);