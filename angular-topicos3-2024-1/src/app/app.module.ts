import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from 'src/app/auth/interceptors/auth.interceptor';
import { ErrorInterceptor } from 'src/app/auth/interceptors/error.interceptor';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import { CompraModule } from 'src/app/compra/compra.module';

import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CustomPaginatorIntl } from 'src/app/models/custom-paginator-intl';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,

  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('jwt_token'),
        allowedDomains: ['unitins.br'],
        disallowedRoutes: ['localhost:8080/login']
      }
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    CompraModule
  ],
  providers: [
    JwtHelperService,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
