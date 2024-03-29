import { ErrorCompComponent } from "./../error-comp/error-comp.component";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from "@angular/common/http";

import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "An unkown error occurred";
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        this.dialog.open(ErrorCompComponent, {
          data: { message: errorMessage }
        });
        return throwError(error);
      })
    );
  }
}
