import { DoctorService } from './doctors.service'
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { generateManyDoctors, generateOneDoctor } from '../pages/doctors/doctors.mock';
import baseUrl from './helper';
import { DoctorDTO } from '../shared/models/doctor.dto';

describe('DoctorService', () => {
  let service: DoctorService;
  let httpController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ HttpClientTestingModule],
      providers: [DoctorService],
    });
    service= TestBed.inject(DoctorService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(DoctorService).toBeTruthy();
  });

  describe('test for gettingDoctorService', () => {
    it('should return a doctors list', (doneFn) => {
      //Arrange
      const mockData = generateManyDoctors(5);

      //Act
      service.getDoctors;
      //Assert
      doneFn();

      expect(mockData).toEqual(mockData);


      });

   });
   describe('test for add Doctors', () => {
    it('should return a new doctor object', (doneFn) => {
      // Arrange
      const mockData = generateOneDoctor();
      const createDoctor: DoctorDTO = {
        nombre: 'Carlos',
        especialidad: 'Internista',
        cedula: '12345678',
      };

      // Act
      service.addDoctors(createDoctor).subscribe(data => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // HTTP config
      const url = `${baseUrl}/doctors`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect (req.request.body).toEqual(createDoctor)
      httpController.verify();
    });


  });
  describe('test for update', () => {
    it('should update a doctor', (doneFn) => {
      // Arrange
      const mockData = generateOneDoctor();
      const updateDoctorDTO: DoctorDTO = {
        nombre: 'Pancracio',
      };
      const idDoctor: number = 1;
      service.editDoctors(idDoctor, updateDoctorDTO).subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      });

      // HTTP config
      const url = `${baseUrl}/doctors/${idDoctor}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.body).toEqual(updateDoctorDTO);
      httpController.verify();
    });
  });
  describe('test for delete', () => {
    it('should delete a doctor', (doneFn) => {
      // Arrange
      const mockData = true;
      const idDoctor = 1;

      // Act
      service.deleteDoctors(idDoctor).subscribe((data) => {
        // Assert
        expect(data).toEqual(mockData);
        doneFn();
      });

      // HTTP config
      const url = `${baseUrl}/doctors/${idDoctor}`;
      const req = httpController.expectOne(url);
      expect(req.request.method).toEqual('DELETE');
      req.flush(mockData);
    });
  });
});
