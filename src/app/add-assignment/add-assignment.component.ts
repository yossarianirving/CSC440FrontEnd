import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../assignment';
import { AssignmentService } from '../assignment.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  courseID;
  newAssignmentForm;
  assignment_id;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private router: Router,
  ) {
    this.assignment_id = this.route.snapshot.queryParamMap.get("assignment_id");
    if (this.assignment_id) {
      this.assignmentService.getAssignmentById(this.assignment_id).then(assignment => {
        let keys = Object.keys(assignment);
        keys.forEach(key => {
          this.newAssignmentForm.controls[key].value = assignment[key];
        })
      })
    }
    this.newAssignmentForm = this.formBuilder.group({
      courseID: 0,
      title: '',
      weight: 0,
      grade: 0
    });
    this.route.queryParamMap.subscribe(v => {
      this.courseID = v['params']['courseID'];
      this.newAssignmentForm.controls.courseID.value = this.courseID;
    })
    
  }

  ngOnInit() {
  }

  onSubmit() {
    let newAssignment = new Assignment(this.newAssignmentForm.value)
    console.log(newAssignment);
    this.assignmentService.addAssignment(newAssignment).then(res => {
      if (res.status == 201) {
        this.router.navigateByUrl('/course/'+this.courseID)
      }
      else {
        alert(res.status+ ' Failed')
      }
    })
  }

}
