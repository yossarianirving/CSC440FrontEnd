import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../course.service';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {Router, ActivatedRoute} from '@angular/router';

import * as _moment from 'moment';
// @ts-ignore
import {default as _rollupMoment, Moment} from 'moment';
import { Course } from '../course';
import { regExValidation } from '../form-validation.directive'
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
  finalGradeOptions = ['', 'A', 'B', 'C', 'D', 'F', 'I'];
  courseID: string; // Needed if this is for editing the assignment
  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.courseID = this.route.snapshot.queryParamMap.get('courseID');
    this.newClassForm = this.formBuilder.group({
      title: ['', [Validators.required, regExValidation(/^[A-Z]{3}[0-9]{3}.?$/, 'titleNotValid')]],
      credits: ['', [Validators.required, regExValidation(/^\d$/, 'creditsNotValid')]],
      semesterTaken: ['', Validators.required],
      yearTaken: moment(),
      finalGrade: '',
      requirementSatisfaction: ['', Validators.required],
      status: ['', Validators.required]
    });
    if (this.courseID) {
      this.courseService.getCourseById(this.courseID).then(course => {
        let keys = Object.keys(course);
        console.log(keys);
        
        keys.forEach(key => {
          if (key === 'id') {
            // do nothing
          }
          else if (key === 'yearTaken') {
            let yearControl = this.newClassForm.controls[key];
            yearControl.value.set('year', course[key]);
            yearControl.setValue(yearControl.value) // this is needed to set the value on the form
          }
          else {
            this.newClassForm.controls[key].setValue(course[key]);
          }
        })

        this.newClassForm.markAsPristine()
        console.log(this.newClassForm.dirty);
        
      })
    }
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
    let response: Promise<Response>;
    // if modifying course
    if (this.courseID) {
      course.id = Number.parseInt(this.courseID);
      response = this.courseService.modifyCourse(course)
    }
    else {
      response = this.courseService.addCourse(course)
    }
    response.then(res => {
      if (res.status != 201 && res.status != 200) {
        alert("Something happened")
      }
      else {
        if (this.courseID) 
          this.router.navigateByUrl('/course/'+this.courseID)
        
        else 
          this.router.navigateByUrl('/courses')
      }
    })
  }

}
