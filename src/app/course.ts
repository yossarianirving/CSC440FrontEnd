
export class Course {
    id: number;
    title: string;
    requirementSatisfaction: string;
    credits: number;
    semesterTaken: string;
    yearTaken: string;
    finalGrade: string;
    status: string;

    constructor(json: Object) {
        this.id = json['id']
        this.title = json['title']
        this.requirementSatisfaction = json['requirementSatisfaction']
        this.credits = json['credits'];
        this.semesterTaken = json['semesterTaken']
        this.yearTaken = json['yearTaken']
        this.finalGrade = json['finalGrade']
        this.status = json['status'];
    }
}