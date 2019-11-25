import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {

  assignments: Assignment[];
  displayedColumns = ['title', 'grade', 'weight', 'buttons']
  classId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private assignmentService: AssignmentService,
  ) { }

  ngOnInit() {
    this.classId =  this.activatedRoute.snapshot.paramMap.get("courseId");
    this.assignmentService.getAssignmentsByCourseId(this.classId).then(assignments => {
      console.log(assignments);
      
      this.assignments = assignments;
    })
  }

}
