import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
