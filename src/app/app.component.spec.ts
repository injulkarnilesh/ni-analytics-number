import { NiAnalyticsNumberComponent } from './analytics-number/components/ni-analytics-number.component';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ColorServiceBuilder } from './analytics-number/services/color-service.builder';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NiAnalyticsNumberComponent
      ],
      providers: [
        ColorServiceBuilder
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ni-analytics-number');
  }));

});
