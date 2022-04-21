import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "../../../http/auth/authorization.guard";
import { CoursesService } from "../../../service/courses.service";
import { EnrollmentsService } from "../../../service/enrollments.service";
import { StudentsService } from "../../../service/students.service";
import { Enrollment } from "../models/enrollment";

@Resolver(() => Enrollment)
export class EnrollmentsResolver {
    constructor(
        private enrollmentsService: EnrollmentsService,
        private coursesService: CoursesService,
        private studentsService: StudentsService
    ) {}



    @UseGuards(AuthorizationGuard)
    @Query(() => [Enrollment])
    enrollments() {
        return this.enrollmentsService.listAllEnrollments();
    }

    @ResolveField()
    student(@Parent() enrollment: Enrollment) {
        return this.studentsService.getStudentById(enrollment.studentId);
    }

    @ResolveField()
    course(@Parent() enrollment: Enrollment) {
        return this.coursesService.getCourseById(enrollment.courseId);
    }

}   