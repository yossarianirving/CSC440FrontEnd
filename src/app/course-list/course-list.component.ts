import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { Course } from '../course'

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[]
  displayedColumns = ["title", "credits", "yearTaken", "semesterTaken", 'finalGrade', 'buttons']
  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    let status = urlParams.get('status');
    status = status ? status : 'in_progress'
    this.courseService.getCourses(status).then(courses => {
      this.courses = courses  
    })
  }

}
