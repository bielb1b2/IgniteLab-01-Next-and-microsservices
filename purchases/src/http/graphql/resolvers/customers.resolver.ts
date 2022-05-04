import { UseGuards } from '@nestjs/common';
import { Resolver, Query, ResolveField, Parent, ResolveReference } from '@nestjs/graphql';
import { CustomerService } from '../../../services/customers.service';
import { PurchasesService } from '../../../services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { Customer } from '../models/customer';

@Resolver(() => Customer)
export class CustomerResolver {
    constructor(
        private customersService: CustomerService,
        private purchasesService: PurchasesService
        ) {}

    @UseGuards(AuthorizationGuard)
    @Query(() => Customer)
    me( @CurrentUser() user: AuthUser ) {
        return this.customersService.getCustomerByAuthUserId(user.sub);
    }

    @ResolveField()
    purchases( @Parent() customer: Customer ) {
        return this.purchasesService.listAllFromCustomer(customer.id);
    }

    @ResolveReference()
    resolverReference(reference: { authUserId: string }) {
        return this.customersService.getCustomerByAuthUserId(reference.authUserId);
    }
}