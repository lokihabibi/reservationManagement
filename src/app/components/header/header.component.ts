import { Component, ViewChild,OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    
  ],

  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('loginModal') loginModal!: LoginComponent;
  
  isScrolled = false;
  isMobileMenuOpen = false;
  isDarkTheme = false;
  private readonly THEME_KEY = 'theme';
  private resizeListener: (() => void) | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.initializeTheme();
    this.setupResizeListener();
    window.addEventListener('scroll', this.handleScroll);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private handleScroll = () => {
    this.isScrolled = window.scrollY > 50;
  };

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }


  private setupResizeListener() {
    this.resizeListener = () => {
      if (window.innerWidth > 768) {
        this.isMobileMenuOpen = false;
      }
    };
    window.addEventListener('resize', this.resizeListener);
  }

  private initializeTheme() {
    const savedTheme = localStorage.getItem(this.THEME_KEY) || 'light';
    this.isDarkTheme = savedTheme === 'dark';
    this.applyTheme(savedTheme);
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const newTheme = this.isDarkTheme ? 'dark' : 'light';
    this.applyTheme(newTheme);
  }

  private applyTheme(theme: string) {
    document.body.dataset['theme'] = theme;
    localStorage.setItem(this.THEME_KEY, theme);
  }
}
