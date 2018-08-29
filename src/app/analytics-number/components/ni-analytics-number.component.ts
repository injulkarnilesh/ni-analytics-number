import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';


@Component({
    selector: 'ni-analytics-number',
    templateUrl: './ni-analytics-number.component.html',
    styleUrls: ['./ni-analytics-number.component.css']
})
export class NiAnalyticsNumberComponent implements OnInit, OnChanges {

    @Input() value: number;
    @Input() displayValue: string;
    @Input() fromValue: number;
    @Input() toValue: number;

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {

    }

}
