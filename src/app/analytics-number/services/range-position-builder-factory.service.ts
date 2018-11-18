
import { Injectable } from '@angular/core';

export interface RangePositionSelector {
    getPosition(): number;
}

export interface RangePositionBuilder {
    withValue(value: number): RangePositionCalculator;
}


export class Range {
    private constructor(private _from: number, private _to: number) {
    }

    static between(from: number, to: number) {
        return new Range(from, to);
    }

    get from(): number {
        return this._from;
    }

    get to(): number {
        return this._to;
    }

    isAscending() {
        return this._from <= this._to;
    }
}

export class Deviation {
    private constructor(private _meanDeviation: number, private _deviation: number) {
    }

    static of(deviation: number) {
        const dev = {
            from: function(meanDeviation: number) {
                return new Deviation(meanDeviation, deviation);
            }
        };
        return dev;
    }

    get meanDeviation(): number {
        return this._meanDeviation;
    }

    get deviation(): number {
        return this._deviation;
    }
}


export class RangePositionCalculator {

    constructor(private selector: RangePositionSelector) {

    }

    getPositionBetween(range: Range): number {
        return range.from + this.selector.getPosition() * (range.to - range.from);
    }

    hasReached(): boolean {
        return 1 === this.selector.getPosition();
    }

}


export class RangePositionBuilderWithBaseRange implements RangePositionBuilder {

    private constructor(private baseRange: Range) {

    }

    static withRange(baseRange: Range): RangePositionBuilderWithBaseRange {
        return new RangePositionBuilderWithBaseRange(baseRange);
    }

    withValue(value: number): RangePositionCalculator {
        return new RangePositionCalculator({
            getPosition: () => {
                if (this.baseRange.isAscending()) {
                    if (value <= this.baseRange.from) {
                        return 0;
                    } else if (value >= this.baseRange.to) {
                        return 1;
                    }
                } else  {
                    if (value >= this.baseRange.from) {
                        return 0;
                    } else if (value <= this.baseRange.to) {
                        return 1;
                    }
                }
                return Math.abs((value - this.baseRange.from) / (this.baseRange.to - this.baseRange.from));
            }
        });
    }


}


export class RangePositionBuilderWithDeviation implements RangePositionBuilder {

    private constructor(private deviation: Deviation) {
    }

    static withDeviation(deviation: Deviation): RangePositionBuilderWithDeviation {
        return new RangePositionBuilderWithDeviation(deviation);
    }

    withValue(value: number): RangePositionCalculator {

        if (value >= this.deviation.meanDeviation) {
            return RangePositionBuilderWithBaseRange.withRange(
                Range.between(this.deviation.meanDeviation, this.deviation.meanDeviation + this.deviation.deviation)
                ).withValue(value);
        }

        return RangePositionBuilderWithBaseRange.withRange(
            Range.between(this.deviation.meanDeviation, this.deviation.meanDeviation - this.deviation.deviation)
            ).withValue(value);
    }

}


@Injectable()
export class RangePositionBuilderFactory {

    forBaseRange(range: Range): RangePositionBuilder {
        return RangePositionBuilderWithBaseRange.withRange(range);
    }

    forDeviation(deviation: Deviation): RangePositionBuilder {
        return RangePositionBuilderWithDeviation.withDeviation(deviation);
    }

}
