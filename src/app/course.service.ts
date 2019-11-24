import { Injectable } from '@angular/core';
import { Course } from './course'

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor() { }

  async getCourses(status: string): Promise<Array<Course>> {
    let url: string = 'http://localhost:8080/courses?=' + status;
    // let response = await fetch(url, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    let fakeData = [
      new Course({
        id: 1, 
        title: 'CSC440', 
        requirementSatisfaction: 'blah',
        credits: 3,
        yearTaken: 2019,
        semesterTaken: 'Fall',
        finalGrade: ''
      }),
      new Course({
        id: 2, 
        title: 'CSC496', 
        requirementSatisfaction: 'bl',
        credits: 1,
        yearTaken: 2019,
        semesterTaken: 'Fall',
        finalGrade: ''
      })
    ]

    return new Promise((resolve, reject) => {
      resolve(fakeData)
    })
  }

}
