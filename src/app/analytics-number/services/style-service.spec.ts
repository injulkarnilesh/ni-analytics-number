import { StyleService } from './style-service';

describe('Unit: Style service', () => {

    const styleService: StyleService = new StyleService();

    it('should get hsl color', () => {
        const range = Math.random();
        const rangeCalculator = jasmine.createSpyObj('rangeCalculator', ['getPositionBetween']);
        rangeCalculator.getPositionBetween.and.returnValue(range);
        const color = styleService.getColor(rangeCalculator);
        expect(color).toBe(`hsl(${(1 - range) * 120},100%,50%)`);
    });

});
