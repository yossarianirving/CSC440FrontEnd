import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../assignment.service';
import { Course } from '../course';
import { CourseService } from '../course.service';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private assignmentService: AssignmentService,
    private courseService: CourseService,
  ) { }

  ngOnInit() {
    this.courseID =  this.activatedRoute.snapshot.paramMap.get("courseId");
    this.assignmentService.getAssignmentsByCourseId(this.courseID).then(assignments => {
      console.log(assignments);
      
      this.assignments = assignments;
    });
    this.courseService.getCourseById(this.courseID).then(res => {
      this.course = res;
    }).catch(e => alert(e))
  }

}
