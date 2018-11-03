import {
    RangePositionBuilderFactory,
    Range,
    RangePositionCalculator,
    RangePositionBuilder } from './range-position-builder-factory.service';

describe('Unit : Range Position Builder Factory', () => {

    const factory: RangePositionBuilderFactory = new RangePositionBuilderFactory();

    describe('for ascending base range', () => {

        it('should calculate position lesser than from', () => {
            const calculator: RangePositionCalculator = factory.forBaseRange(Range.between(10, 100))
                .withValue(9);

            expect(calculator.getPositionBetween(Range.between(100, 1000))).toBe(100);
            expect(calculator.getPositionBetween(Range.between(9, 0))).toBe(9);
        });

        it('should calculate position greater than to', () => {
            const calculator: RangePositionCalculator = factory.forBaseRange(Range.between(10, 100))
                .withValue(101);

            expect(calculator.getPositionBetween(Range.between(100, 1000))).toBe(1000);
            expect(calculator.getPositionBetween(Range.between(9, 0))).toBe(0);
        });

        it('should calculate position equal to from', () => {
            const calculator: RangePositionCalculator = factory.forBaseRange(Range.between(10, 100))
                .withValue(10);

            expect(calculator.getPositionBetween(Range.between(100, 1000))).toBe(100);
            expect(calculator.getPositionBetween(Range.between(9, 0))).toBe(9);
        });

        it('should calculate position equal to to', () => {
            const calculator: RangePositionCalculator = factory.forBaseRange(Range.between(10, 100))
                .withValue(100);

            expect(calculator.getPositionBetween(Range.between(100, 1000))).toBe(1000);
            expect(calculator.getPositionBetween(Range.between(9, 0))).toBe(0);
        });

        it('should calculate range position for new ascending range', () => {
            const calculator: RangePositionCalculator = factory.forBaseRange(Range.between(100, 1000))
              .withValue(300);

            expect(calculator.getPositionBetween(Range.between(11, 20))).toBe(13);
            expect(calculator.getPositionBetween(Range.between(10, 20))).toBe(12.222222222222221);
        });

        it('should calculate range position for new descending range', () => {
            const calculator: RangePositionCalculator = factory.forBaseRange(Range.between(100, 1000))
              .withValue(400);

            expect(calculator.getPositionBetween(Range.between(20, 10))).toBe(16.666666666666668);
            expect(calculator.getPositionBetween(Range.between(9, 0))).toBe(6);
        });

        it('should check if reached', () => {
            const positionBuilder: RangePositionBuilder = factory.forBaseRange(Range.between(100, 1000));

            expect(positionBuilder.withValue(0).hasReached()).toBeFalsy();
            expect(positionBuilder.withValue(999).hasReached()).toBeFalsy();

            expect(positionBuilder.withValue(1000).hasReached()).toBeTruthy();
            expect(positionBuilder.withValue(1001).hasReached()).toBeTruthy();
        });

    });

    describe('for desceding base range', () => {

        it('should calculate position greater than from', () => {
            const calculator: RangePositionCalculator = factory.forBaseRange(Range.between(100, 10))
                .withValue(200);

            expect(calculator.getPositionBetween(Range.between(100, 1000))).toBe(100);
            expect(calculator.getPositionBetween(Range.between(9, 0))).toBe(9);
        });

        it('should calculate position lesser than to', () => {
            const calculator: RangePositionCalculator = factory.forBaseRange(Range.between(100, 10))
                .withValue(5);

            expect(calculator.getPositionBetween(Range.between(100, 1000))).toBe(1000);
            expect(calculator.getPositionBetween(Range.between(999, 0))).toBe(0);
        });

        it('should calculate position equal to from', () => {
            const calculator: RangePositionCalculator = factory.forBaseRange(Range.between(5, 1))
                .withValue(5);

            expect(calculator.getPositionBetween(Range.between(100, 1000))).toBe(100);
            expect(calculator.getPositionBetween(Range.between(90, 0))).toBe(90);
        });

        it('should calculate position equal to to', () => {
            const calculator: RangePositionCalculator = factory.forBaseRange(Range.between(1000, 100))
                .withValue(100);

            expect(calculator.getPositionBetween(Range.between(100, 1000))).toBe(1000);
            expect(calculator.getPositionBetween(Range.between(9, 0))).toBe(0);
        });

        it('should calculate range position for new ascending range', () => {
            const calculator: RangePositionCalculator = factory.forBaseRange(Range.between(100, 0))
              .withValue(80);

            expect(calculator.getPositionBetween(Range.between(0, 2))).toBe(0.4);
            expect(calculator.getPositionBetween(Range.between(10, 110))).toBe(30);
        });

        it('should calculate range position for new descending range', () => {
            const calculator: RangePositionCalculator = factory.forBaseRange(Range.between(1000, 100))
              .withValue(550);

            expect(calculator.getPositionBetween(Range.between(20, 10))).toBe(15);
            expect(calculator.getPositionBetween(Range.between(9, 0))).toBe(4.5);
        });

        it('should check if reached', () => {
            const positionBuilder: RangePositionBuilder = factory.forBaseRange(Range.between(1000, 100));

            expect(positionBuilder.withValue(0).hasReached()).toBeTruthy();
            expect(positionBuilder.withValue(99).hasReached()).toBeTruthy();
            expect(positionBuilder.withValue(100).hasReached()).toBeTruthy();

            expect(positionBuilder.withValue(101).hasReached()).toBeFalsy();
            expect(positionBuilder.withValue(1000).hasReached()).toBeFalsy();
        });

    });


});
