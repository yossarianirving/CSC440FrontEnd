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

  async calculateGpa(): Promise<number> {
    let finishedCourses: Course[] = await this.getCourses('finished');
    // Should be a db constraint!
    // Also only capital letters should be allowed
    finishedCourses = finishedCourses.filter(c => c.finalGrade.match(/^[A-Z]$/)) // only courses that have final grade
    console.log(finishedCourses);
    
    // turn list into dictionary with course as key and array of courses as the values
    // could be more efficient
    let courseNames = new Set(finishedCourses.map(c => c.title));
    let courseDict = {};
    // empty dictionary with array for each unique course name
    courseNames.forEach(cn => {
      courseDict[cn] = []
    });
    
    finishedCourses.forEach(c => {
      courseDict[c.title].push(c)
    });
    console.log(courseDict);
    // grade to credit
    const gtc = {
      'A': 4,
      'B': 3,
      'C': 2,
      'D': 1,
      'F': 0,
      'I': 0
    }
    let totalHours: number = 0;
    let totalCredits: number = 0;
    for (const key of courseNames) {
      let bestCourse: Course = courseDict[key].reduce((a: Course, c: Course) =>
       gtc[a.finalGrade] < gtc[c.finalGrade] ? c : a
      );      
      totalCredits += gtc[bestCourse.finalGrade] * bestCourse.credits;
      totalHours += bestCourse.credits;
    }
    console.log(totalCredits);
    console.log(totalHours);
    
    
    let gpa = totalCredits / totalHours
    console.log(gpa);
    
    return new Promise((res, rej) => {
      res(gpa)
    })
  }

}
