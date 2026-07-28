import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { SummaryStripComponent } from '../../components/summary-strip/summary-strip.component';
import { FilterSectionComponent } from '../../components/filter-section/filter-section.component';
import { ApplicationListViewComponent } from '../../components/application-list-view/application-list-view.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    SummaryStripComponent,
    FilterSectionComponent,
    ApplicationListViewComponent,
    MatCardModule,
    CommonModule,
    // MatButtonModule,
    MatIconModule,
    // MatInputModule,
    // MatFormFieldModule,
    // MatSelectModule,
    // MatChipsModule,
    // MatDividerModule
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {
  showLocalButton : any
  loadLocalData(){
  }

}
