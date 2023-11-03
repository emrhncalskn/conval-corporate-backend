import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from './entities/application.entity';
import { Position } from './entities/position.entity';
import { Project } from './entities/project.entity';
import { Reference } from './entities/reference.entity';
import { Testimonial } from './entities/testimonial.entity';
import { Location } from './entities/location.entity';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly testimonialRepository: Repository<Testimonial>,
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
    @InjectRepository(Reference)
    private readonly referenceRepository: Repository<Reference>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) { }

  async getTestimonial(id: number) {
    return await this.testimonialRepository.findOne({ where: { id } });
  }

  async getTestimonials() {
    return await this.testimonialRepository.find();
  }

  async getPosition(id: number) {
    return await this.positionRepository.findOne({ where: { id } });
  }

  async getPositions() {
    return await this.positionRepository.find();
  }

  async getReferences() {
    return await this.referenceRepository.find();
  }

  async getProjects() {
    return await this.projectRepository.find();
  }

  async getLocations() {
    return await this.locationRepository.find();
  }

  async createApplication(data: CreateApplicationDto, res) {
    try {
      const app = await this.applicationRepository.create(data);
      const check = await this.applicationRepository.save(app);
      if (check) return await res.status(200).json({ message: 'Başvurunuz alınmıştır.' });
      return await res.status(400).json({ message: 'Bir hata oluştu.' });
    }
    catch (error) {
      return await res.status(400).json({ message: 'JSON verisi doğru formatta değil.' });
    }
  }

}
