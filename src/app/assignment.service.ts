import { Injectable } from '@angular/core';
import { Assignment } from './assignment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor() { }

  async getAssignmentsByCourseId(courseId:string): Promise<Array<Assignment>> {
    let url = 'http://localhost:8080/assignments?courseID=' + courseId;
    let response = await fetch(url);
    let assignments = Array<Assignment>()
    if (response.status == 200) {
      assignments= await response.json();
    }
    return new Promise((res, rej) => {
      if (response.status == 200) {
        res(assignments)
      }
      else {
        rej("Status not 200")
      }
    })
    
  }
}
