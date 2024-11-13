import { fakerES_MX as faker } from "@faker-js/faker";

export const generatePetsMock = async (amount) => {
  const pets = [];
  for (let i = 0; i < amount; i++) {
    const pet = {
      name: faker.name.firstName(),
      specie: faker.animal.type(),
      birthDate: faker.date.past(),
      adopted: false,
      image: faker.image.avatar(),
    };
    pets.push(pet);
  }

  return pets;
};