import { Component, Input, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {
    @Input()
    public myCallback: Function;

    public constructor(private router: Router) { }

    public onAboutUsClick(): void {
        this.router.navigateByUrl('/about-us')
        .catch(() => ErrorHandler);
    }

    public onHeaderClick(): void {
        this.router.navigateByUrl('')
        .catch(() => ErrorHandler);
    }
}
