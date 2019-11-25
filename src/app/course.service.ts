import { Injectable } from '@angular/core';
import { Course } from './course'

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor() { }

  async getCourses(status: string): Promise<Array<Course>> {
    let url: string = 'http://localhost:8080/courses?status=' + status;
    let response = await fetch(url, {
      method: 'GET'
    })
    console.log(response);
    
    let courses = Array<Course>();
    if (response.status == 200) {
      courses = await response.json()
    }
    return new Promise((resolve, reject) => {
      resolve(courses)
    })
  }

  addCourse(course: Course): Promise<Response> {
    let url: string = 'http://localhost:8080/courses'
    // TODO: remove random id when server side is corrected
    let id = Math.floor(Math.random() * Math.floor(10000))
    let body = {
      title: course.title,
      credits: course.credits,
      semesterTaken: course.semesterTaken,
      yearTaken: course.yearTaken,
      requirementSatisfaction: course.requirementSatisfaction,
      status: course.status,
      id
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
