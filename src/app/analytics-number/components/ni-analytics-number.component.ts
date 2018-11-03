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

    static FONT_UNITS_SUPPORTED: string[] = ['px', 'em', '%', 'pt' ];

    @Input() value: number;
    @Input() displayValue: string;  // TODO USE
    @Input() fromValue: number;
    @Input() toValue: number;

    @Input() fontUnit: string;
    @Input() fromFontSize: number;
    @Input() toFontSize: number;

    @Input() enableFontWeight = false;
    @Input() enableBlinkEffect = false;

    color: string;
    fontSize: string;
    fontWeight: string;
    blink: boolean;

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
        this.updateView();
    }

    updateView(): void {
        this.setColor();
        this.setFontSize();
        this.setFontWeight();
        this.setBlinkEffect();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.rangePostionBuilder && changes.value) {
            this.updateView();
        }
    }

    private getRangePositionCalculator(value: number): RangePositionCalculator {
        return this.rangePostionBuilder.withValue(value);
    }

    private setColor(): void {
        this.color = this.styleService.getColor(this.getRangePositionCalculator(this.value));
    }

    private setFontSize(): void {
        if (this.validFontSize() && this.validFontUnit()) {
            this.fontSize = this.getRangePositionCalculator(this.value)
                                .getPositionBetween(Range.between(this.fromFontSize, this.toFontSize)) +
                                this.fontUnit;
        }
    }

    private setFontWeight(): void {
        if (this.enableFontWeight) {
            this.fontWeight = (Math.round(
                this.getRangePositionCalculator(this.value).getPositionBetween(Range.between(1, 9))
                ) * 100).toString();
        }
    }

    private setBlinkEffect(): void {
        if (this.enableBlinkEffect) {
            this.blink = this.getRangePositionCalculator(this.value).hasReached();
        }
    }

    private validFontSize(): boolean {
        return this.fromFontSize != null && this.toFontSize != null;
    }

    private validFontUnit(): boolean {
        return this.fontUnit && NiAnalyticsNumberComponent.FONT_UNITS_SUPPORTED.includes(this.fontUnit.toLocaleLowerCase());
    }

}
