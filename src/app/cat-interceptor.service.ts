import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { environment } from "src/environments/environment";

export class CatInterseptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedRequest = req.clone({ headers: req.headers.append('x-api-key', environment.API_KEY)})
    return next.handle(modifiedRequest)
  }
}