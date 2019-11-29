import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseInfoComponent } from './course-info/course-info.component'
import { AddCourseComponent } from './add-course/add-course.component';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CourseListComponent},
  { path: 'course/:courseId', component: CourseInfoComponent },
  { path: 'add_course', component: AddCourseComponent },
  { path: 'add_assignment', component: AddAssignmentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
