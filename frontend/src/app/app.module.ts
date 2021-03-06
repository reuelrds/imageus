import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './shared/material/material.module';
import { SearchComponent } from './search/search.component';
import { ThemePickerModule } from './theme-picker/theme-picker.component';
import { ImageComponent } from './image/image.component';
import { ImageDetailsComponent } from './image/image-details/image-details.component';
import { DialogComponent } from './favourites/dialog/dialog.component';
import { TableComponent } from './favourites/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    SearchComponent,
    ImageComponent,
    ImageDetailsComponent,
    DialogComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ThemePickerModule
  ],
  providers: [],
  entryComponents: [
    ImageDetailsComponent,
    DialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
