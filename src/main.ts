
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { registerLicense } from '@syncfusion/ej2-base';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';
// Registering Syncfusion license key
registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF1cWGhBYVB2WmFZfV1gc19DaVZTRmY/P1ZhSXxQdkJgWH1ecHVQT2JdUkU=');

enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
