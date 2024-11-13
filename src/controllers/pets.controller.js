import PetDTO from "../dto/Pet.dto.js";
import __dirname from "../utils/index.js";

import { PetServices } from "../services/pet.services.js";

export class PetsController {
  constructor() {
    this.petService = new PetServices();
  }

  getAllPets = async (req, res, next) => {
    try {
      const pets = await this.petService.getAll();
      res.send({ status: "success", payload: pets });
    } catch (error) {
      next(error);
    }
  };

  createPet = async (req, res, next) => {
    try {
      const { name, specie, birthDate } = req.body;
      if (!name || !specie || !birthDate) return res.status(400).send({ status: "error", error: "Incomplete values" });
      const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
      const result = await this.petService.create(pet);
      res.send({ status: "success", payload: result });
    } catch (error) {
      next(error);
    }
  };

  updatePet = async (req, res, next) => {
    try {
      const petUpdateBody = req.body;
      const petId = req.params.pid;
      const result = await this.petService.update(petId, petUpdateBody);
      res.send({ status: "success", message: "pet updated" });
    } catch (error) {
      next(error);
    }
  };

  deletePet = async (req, res, next) => {
    try {
      const petId = req.params.pid;
      const result = await this.petService.remove(petId);
      res.send({ status: "success", message: "pet deleted" });
    } catch (error) {
      next(error);
    }
  };

  createPetWithImage = async (req, res, next) => {
    try {
      const file = req.file;
      const { name, specie, birthDate } = req.body;
      if (!name || !specie || !birthDate) return res.status(400).send({ status: "error", error: "Incomplete values" });
      console.log(file);
      const pet = PetDTO.getPetInputFrom({
        name,
        specie,
        birthDate,
        image: `${__dirname}/../public/img/${file.filename}`,
      });
      console.log(pet);
      const result = await petsService.create(pet);
      res.send({ status: "success", payload: result });
    } catch (error) {
      next(error);
    }
  };
}