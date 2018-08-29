import { Injectable } from '@angular/core';
import { ThrowStmt } from '../../../../node_modules/@angular/compiler';

@Injectable()
export class ColorServiceBuilder {

    build(from: number, to: number): ColorService {
        return new ColorService(from, to);
    }

}

export class ColorService {

    constructor(private from: number, private to: number) {

    }

    range(value: number): number {
        if (this.isAscending()) {
            if (value <= this.from ) {
                return 0;
            } else if (value >= this.to) {
                return 1;
            }
        } else  {
            if (value >= this.from) {
                return 0;
            } else if (value <= this.to) {
                return 1;
            }
        }

        return Math.abs((value - this.from) / (this.to - this.from));
    }

    private isAscending() {
        return this.from <= this.to;
    }

    getColor(value: number): string {
        const hue = ((1 - this.range(value)) * 120).toString(10);
        return `hsl(${hue},100%,50%)`;
    }

}
