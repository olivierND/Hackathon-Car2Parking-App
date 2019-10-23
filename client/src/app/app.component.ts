import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild('sidenav')
    private sidenav: MatSidenav;

    public _sidenavCallbackFunction: Function;

    public constructor() {}

    public ngOnInit(): void {
        this._sidenavCallbackFunction = this.toggleSideMenu.bind(this);
    }

    private toggleSideMenu(): void {
        this.sidenav.toggle();
    }
}
