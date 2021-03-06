import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
} from '@angular/material';
import {
  FormsModule, 
  ReactiveFormsModule
} from '@angular/forms';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { HomeComponent } from './home/home.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseInfoComponent } from './course-info/course-info.component';
import { AddCourseComponent } from './add-course/add-course.component'
import { from } from 'rxjs';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { FormValidationDirective } from './form-validation.directive';
import { ViewProgressComponent } from './view-progress/view-progress.component';
import { WhatIfComponent } from './what-if/what-if.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CourseListComponent,
    CourseInfoComponent,
    AddCourseComponent,
    AddAssignmentComponent,
    FormValidationDirective,
    ViewProgressComponent,
    WhatIfComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    WhatIfComponent
  ]
})
export class AppModule { }
