import { ColorServiceBuilder, ColorService } from './color-service.builder';

describe('Unit : ColorServiceBuilder', () => {

    const colorServiceBuilder = new ColorServiceBuilder();

    describe('range for ascending order', () => {

        it('should be 0 if value lesser than from', () => {
            expect(rangeBetween(100, 1000).forValue(99)).toBe(0);
        });

        it('should be 1 if value greater than to', () => {
            expect(rangeBetween(100, 1000).forValue(1001)).toBe(1);
        });

        it('should be 0 if value equals from', () => {
            expect(rangeBetween(100, 1000).forValue(100)).toBe(0);
        });

        it('should be 1 if value equals to', () => {
            expect(rangeBetween(100, 1000).forValue(1000)).toBe(1);
        });

        it('should be 0 if value equals from and to', () => {
            expect(rangeBetween(100, 100).forValue(100)).toBe(0);
        });

        it('should be correct for value towards from', () => {
            expect(rangeBetween(100, 1000).forValue(200)).toBe(1 / 9);
        });

        it('should be correct for value towards to', () => {
            expect(rangeBetween(100, 1000).forValue(900)).toBe(8 / 9);
        });

        it('should be correct for value between from and to', () => {
            expect(rangeBetween(0, 100).forValue(50)).toBe(0.5);
        });

    });

    describe('range for descending order', () => {

        it('should be 1 if value lesser than to', () => {
            expect(rangeBetween(1000, 100).forValue(99)).toBe(1);
        });

        it('should be 0 if value greater than from', () => {
            expect(rangeBetween(1000, 100).forValue(1001)).toBe(0);
        });

        it('should be 0 if value equals from', () => {
            expect(rangeBetween(1000, 100).forValue(1000)).toBe(0);
        });

        it('should be 1 if value equals to', () => {
            expect(rangeBetween(1000, 100).forValue(100)).toBe(1);
        });

        it('should be 0 if value equals from and to', () => {
            expect(rangeBetween(100, 100).forValue(100)).toBe(0);
        });

        it('should be correct for value towards from', () => {
            expect(rangeBetween(100, 10).forValue(20)).toBe(8 / 9);
        });

        it('should be correct for value towards to', () => {
            expect(rangeBetween(100, 10).forValue(90)).toBe(1 / 9);
        });

        it('should be correct for value between from and to', () => {
            expect(rangeBetween(100, 0).forValue(50)).toBe(0.5);
        });

    });

    it('should get color', () => {
        const color = colorServiceBuilder.build(0, 100).getColor(50);
        const hue = (0.5 * 120).toString(10);
        expect(color).toBe('hsl(' + hue + ',100%,50%)');
    });

    function rangeBetween(from: number, to: number) {
        const coloerService: ColorService = colorServiceBuilder.build(from, to);
        return {
            forValue: (v: number) => coloerService.range(v)
        };
    }


});
