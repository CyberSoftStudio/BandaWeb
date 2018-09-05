import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MenuComponent,
    StartComponent,
    ProjectsComponent,
    GraphComponent,
    ChartComponent, TechniquesComponent, TeamComponent, JobComponent, ContactComponent, FooterComponent, GoToTopComponent, CarouselComponent, CarouselItemDirective, CarouselItemElement
} from './components';
import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
} from '@angular/material';
import {TranslatorService} from './services/translator.service';
import {EtherscanService} from './services/etherscan.service';
import { PlotComponent } from './components/plot/plot.component';


@NgModule({
  declarations: [
    AppComponent,
      MenuComponent,
      StartComponent,
      GraphComponent,
      ProjectsComponent,
      ChartComponent,
      TechniquesComponent,
      TeamComponent,
      JobComponent,
      ContactComponent,
      FooterComponent,
      GoToTopComponent,
      CarouselComponent,
      CarouselItemElement,
      CarouselItemDirective,
      PlotComponent
  ],
  imports: [
    BrowserModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatAutocompleteModule,
      MatBadgeModule,
      MatBottomSheetModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatChipsModule,
      MatDatepickerModule,
      MatDialogModule,
      MatDividerModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatPaginatorModule,
      MatProgressBarModule,
      MatProgressSpinnerModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatSortModule,
      MatStepperModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      MatTreeModule,
      FormsModule
  ],
  providers: [
      TranslatorService,
      EtherscanService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
