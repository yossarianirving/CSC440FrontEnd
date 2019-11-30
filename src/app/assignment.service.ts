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
      courseID: newAssignment.courseID
    }
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }

  async modifyAssignment(assignment: Assignment): Promise<Response> {

    let url = 'http://localhost:8080/assignments/'+ assignment.id;
    
    let body = {
      title: assignment.title,
      weight: assignment.weight,
      grade: assignment.grade,
      courseID: assignment.courseID,
    }

    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }

  async getAssignmentById(assignment_id: string): Promise<Assignment> {
    let url = 'http://localhost:8080/assignments/' + assignment_id;
    let response = await fetch(url);
    let assignment: Assignment;
    if (response.status == 200) {
      assignment = await response.json();
      assignment = assignment[0] // remove once server is corrected
      console.log(assignment);
      
    }
    return new Promise((res, rej) => {
      if (response.status == 200) {
        res(assignment)
      }
      else {
        rej(response.status)
      }
    })
  }
}
