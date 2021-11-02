import {CacheInterceptor, Controller, Get, Post, Request, UseInterceptors} from '@nestjs/common';
import {ProductProcessorService} from "./product-processor.service";
import {createThirdApiUrl} from "../utils/sliceUrl";
import {HttpCacheInterceptor} from "../common/http-cache.interceptor";

@Controller('product')
@UseInterceptors(HttpCacheInterceptor)
export class ProductServiceController {
    constructor(private readonly productService: ProductProcessorService) {
    }
    
    @Get()
    getAllProducts(@Request() request) {
        const url = createThirdApiUrl(request.url, 'product')
        return this.productService.get(url);
    }

    @Post()
    createProduct(@Request() request) {
        const body = request.body;
        const url = createThirdApiUrl(request.url, 'product')
        return this.productService.post(url, body)
    }

}
