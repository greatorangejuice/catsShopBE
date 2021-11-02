import {Controller, Get, Put, Request} from '@nestjs/common';
import {CartServiceService} from "./cart-service.service";
import {createThirdApiUrl} from "../utils/sliceUrl";

@Controller('cart')
export class CartServiceController {

    constructor(private readonly cartService: CartServiceService) {
    }

    @Get()
    getItem(@Request() request) {
        const url = createThirdApiUrl(request.url, 'cart')
        return this.cartService.get(url)
    }

    @Put()
    putItem(@Request() request) {
        const url = createThirdApiUrl(request.url, 'cart')
        const body = request.body;
        return this.cartService.put(url, body)
    }
}
