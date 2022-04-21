import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "../../../http/auth/authorization.guard";
import { EnrollmentsService } from "../../../service/enrollments.service";
import { StudentsService } from "../../../service/students.service";
import { AuthUser, CurrentUser } from "../../auth/current-user";
import { Student } from "../models/student";

@Resolver(() => Student)
export class StudentsResolver {
    constructor(
        private studentsSerivce: StudentsService,
        private enrollmentsService: EnrollmentsService
    ) {}

    @UseGuards(AuthorizationGuard)
    @Query(() => Student)
    me(@CurrentUser() user: AuthUser,) {
        return this.studentsSerivce.getStudentByAuthUserId(user.sub);
    }


    @UseGuards(AuthorizationGuard)
    @Query(() => [Student])
    students() {
        return this.studentsSerivce.listAllStudents();
    }

    @ResolveField()
    enrollments(@Parent() student: Student) {
        return this.enrollmentsService.listEnrollmentsByStudent(student.id);
    }
}