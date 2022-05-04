import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class Product {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    slug: string;
}