import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-progress',
  templateUrl: './view-progress.component.html',
  styleUrls: ['./view-progress.component.css']
})
export class ViewProgressComponent implements OnInit {

  

  concentrations: ["General",
   "Digital Forensics and Cybersecurity",
   "Computer Technology",
   "Interactive Multimedia",
   "Artificial Intelligence in data Science",
   "Statistical Computing",
  ]
  constructor() { }

  ngOnInit() {
  }

}
