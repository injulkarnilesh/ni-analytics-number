import { RangePositionBuilderFactory } from './../services/range-position-builder-factory.service';
import { ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { NiAnalyticsNumberComponent } from './ni-analytics-number.component';
import { StyleService } from '../services/style-service';

fdescribe('Unit : NiAnalytics Number Component', () => {

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
        rangePositionCalculator = jasmine.createSpyObj('rangePositionCalculator', ['getPositionBetween']);

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

});
