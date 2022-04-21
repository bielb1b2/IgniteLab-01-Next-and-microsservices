import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Enrollment } from "@prisma/client";
import { query } from "express";
import { userInfo } from "os";
import { AuthorizationGuard } from "../../../http/auth/authorization.guard";
import { CoursesService } from "../../../service/courses.service";
import { EnrollmentsService } from "../../../service/enrollments.service";
import { StudentsService } from "../../../service/students.service";
import { AuthUser, CurrentUser } from "../../auth/current-user";
import { CreateCourseInput } from "../inputs/create-course-input";
import { Course } from "../models/course";

@Resolver(() => Course)
export class CoursesResolver {
    constructor(
        private coursesService: CoursesService,
        private enrollmentsService: EnrollmentsService,
        private studentsService: StudentsService
    ) {}
    
    @Query(() => [Course])
    @UseGuards(AuthorizationGuard)
    courses() {
        return this.coursesService.listAllCourses();
    }

    @Query(() => Course)
    @UseGuards(AuthorizationGuard)
    async course(
        @Args('id') id: string,
        @CurrentUser() user: AuthUser 
    ) {
        const student = await this.studentsService.getStudentByAuthUserId(user.sub);

        if(!student){
            throw new Error('Student not found');
        }

        const enrollment = await this.enrollmentsService.getByCourseAndStudentId({
            courseId: id,
            studentId: student.id
        })

        if(!enrollment) {
            throw new UnauthorizedException();
        }
        
        return this.coursesService.getCourseById(id);
    }

    @Mutation(() => Course)
    @UseGuards(AuthorizationGuard)
    createCourse( @Args('data') data: CreateCourseInput,) {
        this.coursesService.createCourse(data);
    }

}