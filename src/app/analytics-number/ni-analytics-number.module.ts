import { RangePositionBuilderFactory } from './services/range-position-builder-factory.service';
import { NiAnalyticsNumberComponent } from './components/ni-analytics-number.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleService } from './services/style-service';


@NgModule({
    declarations: [NiAnalyticsNumberComponent],
    providers: [
        StyleService,
        RangePositionBuilderFactory
    ],
    imports: [
        CommonModule
    ],
    exports: [NiAnalyticsNumberComponent]
})
export class NiAnalyticsNumberModule {

}
