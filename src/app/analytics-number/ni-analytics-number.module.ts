import { ColorServiceBuilder } from './services/color-service.builder';
import { NiAnalyticsNumberComponent } from './components/ni-analytics-number.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [NiAnalyticsNumberComponent],
    providers: [ColorServiceBuilder],
    exports: [NiAnalyticsNumberComponent]
})
export class NiAnalyticsNumberModule {

}
