export class Assignment {
  id: number;
	title: string;
	weight: number
	grade: number;
  courseID: number;
  
  constructor(json: object) {
    this.id = json['id'];
    this.title = json['title']
    this.weight = json['weight'];
    this.grade = json['grade'];
    this.courseID = json['courseID'];
  }
}