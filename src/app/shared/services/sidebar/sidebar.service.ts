import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public toggleSidebar: BehaviorSubject<any> = new BehaviorSubject<any>(
    localStorage.getItem('sidebarPosition')
  );

  constructor() {}

  public openSidebar(): void {
    // to set sidebar position app component html using "menu-opened" class
    if (localStorage.getItem('sidebarPosition')) {
      localStorage.removeItem('sidebarPosition');
      this.toggleSidebar.next('false');
    } else {
      localStorage.setItem('sidebarPosition', 'true');
      this.toggleSidebar.next('true');
    }
  }

  public closeSidebar(): void {
    // hide sidebar
    this.toggleSidebar.next('false');
    localStorage.removeItem('sidebarPosition');
  }
}
