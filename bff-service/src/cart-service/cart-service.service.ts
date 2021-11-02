import {HttpService, Injectable} from '@nestjs/common';
import {IndexProvider} from "../providers/index.provider";
import {Product} from "../models/product.model";
import {AxiosResponse} from "axios";
import {Observable} from "rxjs";

@Injectable()
export class CartServiceService extends IndexProvider<Product[]>{
    constructor(
       httpService: HttpService,
    ) {
        super(httpService);
    }

    get(url: string): Observable<AxiosResponse<Product[]>> {
        return super.get(url);
    }

    put(url: string, body: object): Observable<AxiosResponse> {
        return super.put(url, body);
    }
}
