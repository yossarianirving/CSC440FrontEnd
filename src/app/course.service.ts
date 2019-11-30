import { Injectable } from '@angular/core';
import { Course } from './course'

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseToEdit: Course;

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

  async getCourseById(id: string): Promise<Course> {
    let url: string = 'http://localhost:8080/courses/'+id;
    let response = await fetch(url);
    let course: Course;
    if (response.status == 200) {
      course = await response.json()
      course = course[0]; // TODO fix this once server responds back with just the object
    }
    return new Promise((resolve, reject) => {
      if (course) {
        resolve(course)
      }
      else {
        reject(response)
      }
    })
  }

  addCourse(course: Course): Promise<Response> {
    let url: string = 'http://localhost:8080/courses'
    let body = {
      title: course.title,
      credits: course.credits,
      semesterTaken: course.semesterTaken,
      yearTaken: course.yearTaken,
      requirementSatisfaction: course.requirementSatisfaction,
      status: course.status,
      finalGrade: course.finalGrade,
    }
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }

  modifyCourse(course: Course): Promise<Response> {
    let url: string = 'http://localhost:8080/courses/'+course.id;
    let body = {
      title: course.title,
      credits: course.credits,
      semesterTaken: course.semesterTaken,
      yearTaken: course.yearTaken,
      requirementSatisfaction: course.requirementSatisfaction,
      status: course.status,
      finalGrade: course.finalGrade,
    }
    return fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }

  deleteCourse(courseID: string): Promise<Response> {
    let url: string = 'http://localhost:8080/courses/' + courseID;
    return fetch(url, {
      method: 'DELETE'
    })
  }

}
