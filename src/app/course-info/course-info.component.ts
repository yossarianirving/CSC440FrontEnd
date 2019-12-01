import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../assignment.service';
import { Course } from '../course';
import { CourseService } from '../course.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { WhatIfComponent } from '../what-if/what-if.component';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {

  assignments: Assignment[];
  displayedColumns = ['title', 'grade', 'weight', 'buttons']
  courseID: string;
  course: Course;
  currentGrade: number

  constructor(
    private activatedRoute: ActivatedRoute,
    private assignmentService: AssignmentService,
    private courseService: CourseService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.courseID =  this.activatedRoute.snapshot.paramMap.get("courseId");
    this.assignmentService.getAssignmentsByCourseId(this.courseID).then(assignments => {
      this.assignments = assignments;
      this.calculateCurrentGrade()
    });
    this.courseService.getCourseById(this.courseID).then(res => {
      this.course = res;
    }).catch(e => alert(e))
  }

  calculateCurrentGrade() {
    let weightedPoints = this.assignments.reduce((a, b) => a + (b.grade * (b.weight / 100)), 0);
    let totalWeights = this.assignments.reduce((a, b) => a + b.weight, 0)
    this.currentGrade = weightedPoints / totalWeights * 100;
  }

  whatIfDialog() {
    const dialogRef = this.dialog.open(WhatIfComponent, {
      width: '400px',
      maxWidth: '95vw',
      data: { assignments: this.assignments }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
