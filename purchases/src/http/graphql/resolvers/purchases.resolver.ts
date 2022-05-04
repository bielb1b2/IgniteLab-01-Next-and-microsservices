import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent, Mutation, Args } from '@nestjs/graphql';
import { CustomerService } from '../../../services/customers.service';
import { ProductsService } from '../../../services/products.service';
import { PurchasesService } from '../../../services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {
    constructor(
        private purchasesService: PurchasesService,
        private productsService: ProductsService,
        private customersService: CustomerService
    ) {}

    @Query(() => [Purchase])
    @UseGuards(AuthorizationGuard)
    purchases() {
        return this.purchasesService.listAllPurchases();
    }

    @ResolveField(() => Product)
    product( @Parent() purchase: Purchase ) {
        return this.productsService.getProductById(purchase.productId)
    }

    @Mutation(() => Purchase)
    @UseGuards(AuthorizationGuard)
    async createPurchase( @Args('data') data: CreatePurchaseInput,@CurrentUser() user: AuthUser) {
        
        let customer = await this.customersService.getCustomerByAuthUserId(user.sub);
        
        if(!customer) {
            customer = await this.customersService.createCustomer({
                authUserId: user.sub
            })
        }

        return this.purchasesService.createPurchase({
            productId: data.productId,
            customerId: customer.id
        });
    }
}