import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

interface CreateCustomerProps {
    authUserId: string;
}

@Injectable()
export class CustomerService {
    constructor(private prisma: PrismaService) {}


    getCustomerByAuthUserId(authUserId: string) {
        return this.prisma.customer.findUnique({
            where: {
                authUserId,
            }
        })
    }

    async createCustomer({ authUserId }: CreateCustomerProps) {

        return this.prisma.customer.create({
            data: {
                authUserId,
            }
        })
    }

}