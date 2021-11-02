import {HttpService, Injectable} from '@nestjs/common';
import {Product} from "../models/product.model";
import {AxiosResponse} from 'axios';
import {Observable} from 'rxjs';
import {IndexProvider} from "../providers/index.provider";

@Injectable()
export class ProductProcessorService extends IndexProvider<Product[]> {

    constructor(
       httpService: HttpService,
    ) {
        super(httpService);
    }
    get(url: string): Observable<AxiosResponse<Product[]>> {
        return super.get(url);
    }

    post(url: string, body: object): Observable<AxiosResponse> {
        return super.post(url, body);
    }
}
