import { Injectable } from '@angular/core';

interface RangePositionSelector {
    getPosition(): number;
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

export class RangePositionCalculator {

    constructor(private selector: RangePositionSelector) {

    }

    getPositionBetween(range: Range): number {
        return range.from + this.selector.getPosition() * (range.to - range.from);
    }

}

export class RangePositionBuilder {

    constructor(private baseRange: Range) {

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



@Injectable()
export class RangePositionBuilderFactory {

    forBaseRange(range: Range): RangePositionBuilder {
        return new RangePositionBuilder(range);
    }

}
