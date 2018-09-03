import { RangePositionCalculator } from './../services/range-position-builder-factory.service';
import { RangePositionBuilder } from './../services/range-position-builder-factory.service';
import { RangePositionBuilderFactory, Range } from './../services/range-position-builder-factory.service';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { StyleService } from '../services/style-service';

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

    color: string;

    rangePostionBuilder: RangePositionBuilder;

    constructor(private rangePositionBuilderFactory: RangePositionBuilderFactory,
                private styleService: StyleService) {

    }

    ngOnInit() {
        if (this.fromValue === undefined || this.toValue === undefined) {
            console.error('fromValue and toValue are required');
            return;
        }
        this.rangePostionBuilder = this.rangePositionBuilderFactory.forBaseRange(Range.between(this.fromValue, this.toValue));
        this.color = this.styleService.getColor(this.getRangePositionCalculator(this.value));
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.rangePostionBuilder && changes.value) {
            this.color = this.styleService.getColor(this.getRangePositionCalculator(changes.value.currentValue));
        }
    }

    private getRangePositionCalculator(value: number): RangePositionCalculator {
        return this.rangePostionBuilder.withValue(value);
    }

}
