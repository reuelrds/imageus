import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgModule,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
  Renderer2,
} from '@angular/core';
import {ThemeStorage, DocsSiteTheme} from './theme-storage';
// import {
  // MatButtonModule,
  // MatGridListModule,
  // MatIconModule,
  // MatMenuModule,
  // MatTooltipModule,
// } from '@angular/material';
import {CommonModule} from '@angular/common';
// import {ActivatedRoute} from '@angular/router';
import {Subscription, BehaviorSubject} from 'rxjs';
import {map, filter} from 'rxjs/operators';
import { MaterialModule } from '../shared/material/material.module';


@Component({
  selector: 'imageus-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ThemePickerComponent implements OnInit, OnDestroy {
  private queryParamSubscription = Subscription.EMPTY;


  @Output() themeType = new EventEmitter();

  themes: DocsSiteTheme[] = [
    {
      primary: '#0097A7',
      accent: '#80CBC4',
      name: 'cyan-teal',
      isDark: false,
      isDefault: true
    },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      name: 'pink-bluegrey',
      isDark: true,
      isDefault: false
    }
  ];
  currentTheme: DocsSiteTheme = this.themes[1];
  // isThemeDark = new BehaviorSubject(false);

  constructor(
    private themeStorage: ThemeStorage,
    // private activatedRoute: ActivatedRoute,
    private renderer: Renderer2
  ) {
    this.installTheme(this.themeStorage.getStoredThemeName());
  }

  ngOnInit() {
    // this.queryParamSubscription = this.activatedRoute.queryParamMap
      // .pipe(map(params => params.get('theme')), filter(Boolean))
      // .subscribe(themeName => this.installTheme(themeName));


    if (this.currentTheme) {
      this.themeStorage.storeTheme(this.currentTheme);
    }
  }

  ngOnDestroy() {
    this.queryParamSubscription.unsubscribe();
  }

  installTheme(themeName) {
    let theme;
    if (!themeName) {
      theme = this.themes.find(currentTheme => currentTheme.isDefault === true);
    } else {
      theme = this.themes.find(currentTheme => currentTheme.name === themeName);
    }


    if (!theme) {
      return;
    }

    this.currentTheme = theme;

    if (theme.isDark) {
      // this.styleManager.removeStyle('theme');
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      // this.styleManager.setStyle('theme', `assets/custom-themes/${theme.name}.scss`);
      this.renderer.removeClass(document.body, 'dark-theme');
    }
    console.log(theme);
    this.themeType.emit(theme.isDark);

    if (this.currentTheme) {
      this.themeStorage.storeTheme(this.currentTheme);
    }
  }

}

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ThemePickerComponent],
  declarations: [ThemePickerComponent],
  providers: [ThemeStorage],
})
export class ThemePickerModule { }
