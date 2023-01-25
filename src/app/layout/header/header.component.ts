import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  darkMode: boolean = false;
  private themeSubject = new BehaviorSubject<any>(null);
  theme$ = this.themeSubject.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public http:HttpClient,
    private router: Router,
    private renderer: Renderer2) {
    const theme = localStorage.getItem('theme');
    if (theme) {      
      this.themeSubject.next(Boolean(theme));
      this.darkMode = Boolean(theme);
      this.setBackground();
    } else {
      this.setTheme(Boolean(theme))
    }
  }
  
  setTheme(mode: boolean) {
    this.themeSubject.next(mode);
    localStorage.setItem('theme', String(mode));
    this.setBackground();
  }

  setBackground() {
    if(this.darkMode) {
      this.renderer.addClass(this.document.body, "dark");
    } else {
      this.renderer.removeClass(this.document.body, "dark");
    }
  }

  toggleMode(mode: boolean) {
    this.darkMode = mode;
    this.setTheme(mode);
  }

}
