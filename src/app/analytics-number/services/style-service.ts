import { RangePositionCalculator, Range } from './range-position-builder-factory.service';
import { Injectable } from '@angular/core';

@Injectable()
export class StyleService {

    public getColor(rangeCalculator: RangePositionCalculator): string {
        const hue = ((1 - rangeCalculator.getPositionBetween(Range.between(0, 1))) * 120).toString(10);
        return `hsl(${hue},100%,50%)`;
    }

}
