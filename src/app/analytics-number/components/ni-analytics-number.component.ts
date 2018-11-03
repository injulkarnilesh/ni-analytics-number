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
    @Input() displayValue: string;  // TODO USE
    @Input() fromValue: number;
    @Input() toValue: number;

    @Input() fontUnit: string;
    @Input() fromFontSize: number;
    @Input() toFontSize: number;

    color: string;
    fontSize: string;

    rangePostionBuilder: RangePositionBuilder;

    fontUnitsSupported: string[] = ['px', 'em', '%', 'pt' ];

    constructor(private rangePositionBuilderFactory: RangePositionBuilderFactory,
                private styleService: StyleService) {

    }

    ngOnInit() {
        if (this.fromValue === undefined || this.toValue === undefined) {
            console.error('fromValue and toValue are required');
            return;
        }
        this.rangePostionBuilder = this.rangePositionBuilderFactory.forBaseRange(Range.between(this.fromValue, this.toValue));
        this.setColor();
        this.setFont();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.rangePostionBuilder && changes.value) {
            this.setColor();
            this.setFont();
        }
    }

    private getRangePositionCalculator(value: number): RangePositionCalculator {
        return this.rangePostionBuilder.withValue(value);
    }

    private setColor(): void {
        this.color = this.styleService.getColor(this.getRangePositionCalculator(this.value));
    }

    private setFont(): void {
        console.log('Setting font size to', this.fromFontSize, this.toFontSize, this.fontUnit);
        if (this.validFontSize() && this.validFontUnit()) {
            this.fontSize = this.getRangePositionCalculator(this.value)
                                .getPositionBetween(Range.between(this.fromFontSize, this.toFontSize)) +
                                this.fontUnit;
            console.log('Set font size to', this.fontSize);
        }
    }

    private validFontSize(): boolean {
        return this.fromFontSize != null && this.toFontSize != null;
    }

    private validFontUnit(): boolean {
        return this.fontUnit && this.fontUnitsSupported.includes(this.fontUnit.toLocaleLowerCase());
    }


}
