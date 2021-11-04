import {Observable} from "rxjs";
import {AxiosResponse} from "axios";
import {catchError, map} from "rxjs/operators";
import {HttpException, HttpService, HttpStatus} from "@nestjs/common";

export abstract class IndexProvider<T> {

    protected constructor(
        readonly httpService: HttpService
    ) {
    }

    get(url: string): Observable<AxiosResponse<T>> {
        try {
            return this.httpService.get<AxiosResponse<T>>(url, {})
                .pipe(
                    map((response) => {
                        return response.data
                    }),
                    catchError((err) => {
                        throw new HttpException(err.response.data.message, err.response.status)
                    })
                )
        } catch (e) {
            throw new HttpException('Cannot process request', HttpStatus.BAD_GATEWAY)
        }
    }

    post(url: string, body: object): Observable<AxiosResponse> {
        try {
            return this.httpService.post(url, body).pipe(
                map(response => {
                    return response.data
                }),
                catchError((err) => {
                    throw new HttpException(err.response.data.message, err.response.status)
                })
            )
        } catch (e) {
            throw new HttpException('Cannot process request', HttpStatus.BAD_GATEWAY)
        }
    }

    put(url: string, body: object): Observable<AxiosResponse> {
        try {
            return this.httpService.put(url, body).pipe(
                map(response => {
                    return response.data
                }),
                catchError((err) => {
                    throw new HttpException(err.response.data.message, err.response.status)
                })
            )
        } catch (e) {
            throw new HttpException('Cannot process request', HttpStatus.BAD_GATEWAY)
        }
    }
}
