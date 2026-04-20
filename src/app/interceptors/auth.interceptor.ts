import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = sessionStorage.getItem('token');

        if (authToken) {
            const clonedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            return next.handle(clonedReq);
        }

        return next.handle(req);
    }

}