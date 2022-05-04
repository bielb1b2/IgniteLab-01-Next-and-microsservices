import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from '../../../services/products.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CreateProductInput } from '../inputs/create-product-input';
import { Product } from '../models/product';

@Resolver(() => Product)
export class ProductsResolver {
    constructor(private productsService: ProductsService) {}

    @Query(() => [Product])
    // @UseGuards(AuthorizationGuard)
    products() {
        return this.productsService.listAllProducts();
    }

    @UseGuards(AuthorizationGuard)
    @Mutation(() => Product)
    createProduct(
        @Args('data') data: CreateProductInput
    ) {
        return this.productsService.createProduct(data);
    }
}