import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Assignment } from '../assignment';


@Component({
  selector: 'app-what-if',
  templateUrl: './what-if.component.html',
  styleUrls: ['./what-if.component.css']
})
export class WhatIfComponent implements OnInit {
  assignments: Assignment[]
  remaining: string;
  toGet: string;
  afterRemaining: number;
  need: number;

  constructor(
    public dialogRef: MatDialogRef<WhatIfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.assignments = this.data['assignments'];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  calculate() {
    let totalWeights = this.assignments.reduce((a, b) => a + b.weight, 0);
    let remainingPoints = 100 - totalWeights;
    let remainingGrade = Number.parseFloat(this.remaining);
    let weightedPoints = this.assignments.reduce((a, b) => a + (b.grade * (b.weight / 100)), 0);
    this.afterRemaining = (remainingGrade * remainingPoints / 100) + weightedPoints;
    let desiredGrade = Number.parseFloat(this.toGet);
    this.need = 100 * (desiredGrade - weightedPoints) / remainingPoints;     
  }
}
