import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../assignment';
import { AssignmentService } from '../assignment.service';
import { regExValidation } from '../form-validation.directive'

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
          if ( key === 'id') {} // do nothing
          else
            this.newAssignmentForm.controls[key].setValue(assignment[key]);
        })
      })
    }
    const decimalRegex = /\d+(\.\d+)?$/
    this.newAssignmentForm = this.formBuilder.group({
      courseID: [0, Validators.required],
      title: ['', Validators.required],
      weight: ['', [Validators.required, regExValidation(decimalRegex, 'weightNotNumber')]],
      grade: ['', [Validators.required, regExValidation(decimalRegex, 'gradeNotNumber')]]
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
    let response: Promise<Response>;
    // if modifying an assignment
    if (this.assignment_id) {
      newAssignment.id = this.assignment_id;
      response = this.assignmentService.modifyAssignment(newAssignment);
    }
    else {
      response = this.assignmentService.addAssignment(newAssignment);
    }
    response.then(res => {
      if (res.status == 201 || res.status == 200) {
        this.router.navigateByUrl('/course/'+this.courseID)
      }
      else {
        alert(res.status+ ' Failed')
      }
    })
  }

  deleteAssignment() {    
    if (this.assignment_id) {
      if (window.confirm("Are you sure you want to delete this assignment?")) {
        this.assignmentService.deleteAssignment(this.assignment_id).then(res => {
          if (res.status === 200) {
            this.router.navigateByUrl('/course/'+this.courseID);
          }
          else {
            alert("Assignment deletion failed")
          }
        })
      }
    }
  }

}
