import { ColorServiceBuilder, ColorService } from './../services/color-service.builder';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';


@Component({
    selector: 'ni-analytics-number',
    templateUrl: './ni-analytics-number.component.html',
    styleUrls: ['./ni-analytics-number.component.css']
})
export class NiAnalyticsNumberComponent implements OnInit, OnChanges {

    @Input() value: number;
    @Input() displayValue: string;
    @Input() fromValue: number;
    @Input() toValue: number;

    colorService: ColorService;
    color: string;

    constructor(private colorBuilder: ColorServiceBuilder) {

    }

    ngOnInit() {
        this.colorService = this.colorBuilder.build(this.fromValue, this.toValue);
        this.color = this.colorService.getColor(this.value);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.colorService && changes.value) {
            this.color = this.colorService.getColor(changes.value.currentValue);
        }
    }

}
