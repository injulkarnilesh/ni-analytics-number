import { RangePositionBuilderFactory, Range } from './../services/range-position-builder-factory.service';
import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { NiAnalyticsNumberComponent } from './ni-analytics-number.component';
import { StyleService } from '../services/style-service';

describe('Unit : NiAnalytics Number Component', () => {

    let testBed;
    let componentFixture: ComponentFixture<NiAnalyticsNumberComponent>;
    let component: NiAnalyticsNumberComponent;
    let styleService;
    let rangePositionBuilderFactory;
    let rangePostionBuilder;
    let rangePositionCalculator;

    beforeEach(() => {
        styleService = jasmine.createSpyObj('styleService', ['getColor']);
        rangePositionBuilderFactory = jasmine.createSpyObj('rangePositionBuilderFactory', ['forBaseRange']);
        rangePostionBuilder = jasmine.createSpyObj('rangePostionBuilder', ['withValue']);
        rangePositionCalculator = jasmine.createSpyObj('rangePositionCalculator', ['getPositionBetween', 'hasReached']);

        rangePositionBuilderFactory.forBaseRange.and.returnValue(rangePostionBuilder);
        rangePostionBuilder.withValue.and.returnValue(rangePositionCalculator);

        TestBed.configureTestingModule({
            declarations: [ NiAnalyticsNumberComponent],
            providers: [
                { provide:  RangePositionBuilderFactory, useValue: rangePositionBuilderFactory },
                { provide:  StyleService, useValue: styleService }
            ]
        });

        testBed = getTestBed();
        componentFixture = testBed.createComponent(NiAnalyticsNumberComponent);
        styleService = testBed.get(StyleService);
        component = componentFixture.componentInstance;
    });

    it('should not intialize rangePostionBuilder if fromValue not defined', () => {
        component.toValue = 23;
        componentFixture.detectChanges();

        expect(component.rangePostionBuilder).toBeUndefined();
        expect(rangePositionBuilderFactory.forBaseRange).not.toHaveBeenCalled();
    });

    it('should not intialize rangePostionBuilder if toValue not defined', () => {
        component.fromValue = 23;
        componentFixture.detectChanges();

        expect(component.rangePostionBuilder).toBeUndefined();
        expect(rangePositionBuilderFactory.forBaseRange).not.toHaveBeenCalled();
    });

    it('should  intialize rangePostionBuilder if fromValue and toValue defined', () => {
        component.fromValue = 0;
        component.toValue = 100;
        componentFixture.detectChanges();

        expect(component.rangePostionBuilder).toBeDefined();
        expect(rangePositionBuilderFactory.forBaseRange).toHaveBeenCalled();
    });

    it('should set color the first time', () => {
        component.fromValue = 0;
        component.toValue = 100;
        component.value = 50;
        const color = 'someColor';
        styleService.getColor.and.returnValue(color);
        componentFixture.detectChanges();

        expect(rangePositionBuilderFactory.forBaseRange).toHaveBeenCalled();
        expect(rangePostionBuilder.withValue).toHaveBeenCalledWith(component.value);
        expect(styleService.getColor).toHaveBeenCalledWith(rangePositionCalculator);
        expect(component.color).toBe(color);
    });

    describe('with font-weight', () => {

        const fontWeightPosition = 2;

        beforeEach(() => {
            component.fromValue = 0;
            component.toValue = 100;
            rangePositionCalculator.getPositionBetween.and.returnValue(fontWeightPosition);
        });

        it('disabled should not set font weight', () => {
            componentFixture.detectChanges();

            expect(component.fontWeight).toBeUndefined();
        });

        it('enabled should set font weight', () => {
            component.enableFontWeight = true;

            componentFixture.detectChanges();

            expect(component.fontWeight).toBeDefined();
            expect(rangePositionCalculator.getPositionBetween).toHaveBeenCalledWith(
                Range.between(1, 9)
            );
            expect(component.fontWeight).toBe('200');
        });

    });

    describe('with font-size', () => {

        const fontSize = Math.random();

        beforeEach(() => {
            component.fromValue = 0;
            component.toValue = 100;
            rangePositionCalculator.getPositionBetween.and.returnValue(fontSize);
        });

        it('should not set font size if font unit not provided', () => {
            component.fromFontSize = 10;
            component.toFontSize = 100;

            componentFixture.detectChanges();

            expect(component.fontSize).toBeUndefined();
        });

        it('should not set font size if font unit not valid', () => {
            component.fromFontSize = 10;
            component.toFontSize = 100;
            component.fontUnit = 'anythingElse';

            componentFixture.detectChanges();

            expect(component.fontSize).toBeUndefined();
        });

        it('should not set font size if font start range not provided', () => {
            component.toFontSize = 100;
            component.fontUnit = 'px';

            componentFixture.detectChanges();

            expect(component.fontSize).toBeUndefined();
        });

        it('should not set font size if font end range not provided', () => {
            component.fromFontSize = 100;
            component.fontUnit = 'px';

            componentFixture.detectChanges();

            expect(component.fontSize).toBeUndefined();
        });

        it('should set font size if font unit and range details provided', () => {
            component.fromFontSize = 10;
            component.toFontSize = 100;
            component.fontUnit = 'px';

            componentFixture.detectChanges();

            expect(rangePositionCalculator.getPositionBetween).toHaveBeenCalledWith(
                Range.between(component.fromFontSize, component.toFontSize)
            );
            expect(component.fontSize).toBeDefined();
            expect(component.fontSize).toBe(fontSize + component.fontUnit);
        });

    });

    describe('with blink effect', () => {

        beforeEach(() => {
            component.fromValue = 0;
            component.toValue = 100;
        });

        it('should not blink if disabled', () => {
            component.enableBlinkEffect = false;
            componentFixture.detectChanges();

            expect(component.blink).toBeFalsy();
        });

        it('should blink if enabled and value reached', () => {
            rangePositionCalculator.hasReached.and.returnValue(true);
            component.enableBlinkEffect = true;
            componentFixture.detectChanges();

            expect(rangePositionCalculator.hasReached).toHaveBeenCalled();
            expect(component.blink).toBeTruthy();
        });

        it('should not blink if enabled and value not reached', () => {
            rangePositionCalculator.hasReached.and.returnValue(false);
            component.enableBlinkEffect = true;
            componentFixture.detectChanges();

            expect(rangePositionCalculator.hasReached).toHaveBeenCalled();
            expect(component.blink).toBeFalsy();
        });

    });

});
