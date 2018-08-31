import { ColorServiceBuilder } from './services/color-service.builder';
import { NiAnalyticsNumberComponent } from './components/ni-analytics-number.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [NiAnalyticsNumberComponent],
    providers: [ColorServiceBuilder],
    imports: [
        CommonModule
    ],
    exports: [NiAnalyticsNumberComponent]
})
export class NiAnalyticsNumberModule {

}
