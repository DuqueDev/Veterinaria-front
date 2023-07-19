import { faker } from '@faker-js/faker';

export const generateOneDoctor = () => {
  return {
    id: faker.string.uuid(),
    nombre: faker.person.firstName(),
    especialidad: faker.person.jobType(),
    cedula: faker.string.numeric,
  };
};

export const generateManyDoctors = (size = 10) => {
  const doctors = [];

  for (let index = 0; index < size; index++) {
    doctors.push(generateOneDoctor());
  }

  return doctors;
};
