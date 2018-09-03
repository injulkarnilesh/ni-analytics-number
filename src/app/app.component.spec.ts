import { RangePositionBuilderFactory } from './analytics-number/services/range-position-builder-factory.service';
import { FormsModule } from '@angular/forms';
import { StyleService } from './analytics-number/services/style-service';
import { NiAnalyticsNumberComponent } from './analytics-number/components/ni-analytics-number.component';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NiAnalyticsNumberComponent
      ],
      providers: [
        StyleService,
        RangePositionBuilderFactory
      ],
      imports: [
        FormsModule
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
