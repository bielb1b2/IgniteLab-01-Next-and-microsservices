import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CoursesService } from '../service/courses.service';
import { EnrollmentsService } from '../service/enrollments.service';
import { StudentsService } from '../service/students.service';
import { PurchaseController } from './controllers/purchases.controller';

// HTTP (MVC)

@Module({
    imports: [DatabaseModule],
    controllers: [PurchaseController],
    providers: [
        StudentsService,
        CoursesService,
        EnrollmentsService
    ],
})
export class MessagingModule {}
