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

  async addAssignment(newAssignment: Assignment): Promise<Response> {
    let url = 'http://localhost:8080/assignments';
    let body = {
      title: newAssignment.title,
      weight: newAssignment.weight,
      grade: newAssignment.grade,
      course_id: newAssignment.course_id
    }
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }
}
