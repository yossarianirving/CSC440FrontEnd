import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../course.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {Router} from '@angular/router';

import * as _moment from 'moment';
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';
import { Course } from '../course';
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AddCourseComponent implements OnInit {
  newClassForm: FormGroup;
  semesterOptions = ['SPRING', 'SUMMER', 'FALL', 'WINTER'];
  statusOptions = ['finished', 'in_progress'];
  requirementTypes = [
    "Supporting",
    "Core",
    "Concentration",
    "ACCT",
    "Writing Intensive",
    "Gen Ed E1",
    "Gen Ed E2",
    "Gen Ed E3",
    "Gen Ed E4",
    "Gen Ed E5",
    "Gen Ed E6",
    "Upper Division",
    "Free Elective"
  ];
  finalGradeOptions = ['', 'A', 'B', 'C', 'D', 'F', 'I']
  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private router: Router,
  ) { 
    this.newClassForm = this.formBuilder.group({
      title: '',
      credits: '',
      semesterTaken: '',
      yearTaken: moment(),
      finalGrade: '',
      requirementSatisfaction: '',
      status: ''
    })
  }

  ngOnInit() {
  }

  chosenYearHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.newClassForm.controls.yearTaken.value;
    ctrlValue.year(normlizedMonth.year());
    this.newClassForm.controls.yearTaken.setValue(ctrlValue);
    datepicker.close();
  }

  onSubmit(newClassData) {
    let title = this.newClassForm.controls.title.value;
    let credits = this.newClassForm.controls.credits.value;
    let semesterTaken = this.newClassForm.controls.semesterTaken.value;
    let yearTaken = this.newClassForm.controls.yearTaken.value.year();
    let finalGrade = this.newClassForm.controls.finalGrade.value;
    let requirementSatisfaction = this.newClassForm.controls.requirementSatisfaction.value;
    let status = this.newClassForm.controls.status.value;

    let course = new Course({
      title,
      credits,
      semesterTaken,
      yearTaken,
      finalGrade,
      requirementSatisfaction,
      status
    })
    console.log(course);
    this.courseService.addCourse(course).then(res => {
      if (res.status != 201) {
        alert("Something happened")
      }
      else {
        this.router.navigateByUrl('/courses')
      }
    })
  }

}
