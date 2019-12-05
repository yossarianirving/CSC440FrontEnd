import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroup }   from '@angular/forms';
import { Requirements } from '../requirements';
import { RequirementsService } from '../requirements.service';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-view-progress',
  templateUrl: './view-progress.component.html',
  styleUrls: ['./view-progress.component.css']
})
export class ViewProgressComponent implements OnInit {
  gpa: number;
  concenGroup: FormGroup;
  requirements: Requirements;
  concentrations = [
    "General",
    "Digital Forensics and Cybersecurity",
    "Computer Technology",
    "Interactive Multimedia",
    "Artificial Intelligence in data Science",
    "Statistical Computing",
  ]
  constructor(
    private requirementsService: RequirementsService,
    private courseService: CourseService,
  ) {
    this.concenGroup = new FormGroup({
      concentration: new FormControl('')
    });
    this.courseService.calculateGpa().then(res => { this.gpa = res})
  }

  ngOnInit() {
  }

  onSubmit() {
    this.concenGroup.markAsPristine();
    let concentration: string = this.concenGroup.controls['concentration'].value;
    this.requirementsService.getProgress(concentration).then(req => {
      this.requirements = req
    }).catch(e => {
      console.log('Error');
      
    })
  }

}
