import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import path from 'path'

import { DatabaseModule } from '../database/database.module';
import { CoursesService } from '../service/courses.service';
import { EnrollmentsService } from '../service/enrollments.service';
import { StudentsService } from '../service/students.service';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { StudentsResolver } from './graphql/resolvers/students.resolver';

@Module({
    imports: [
        ConfigModule.forRoot(), 
        DatabaseModule,
        GraphQLModule.forRoot({
            driver: ApolloDriver,
            autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
        })
    ],

    providers: [
        // Resolvers
        StudentsResolver,
        CoursesResolver,
        EnrollmentsResolver,

        // Service
        StudentsService,
        CoursesService,
        EnrollmentsService
    ]
})
export class HttpModule {}
