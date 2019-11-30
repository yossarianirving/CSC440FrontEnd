import { Injectable } from '@angular/core';
import { Requirements } from './requirements';

@Injectable({
  providedIn: 'root'
})
export class RequirementsService {

  constructor() { }

  async getProgress(concentration: string): Promise<Requirements> {
    let url = 'http://localhost:8080/concentrationRequirements?concentrationSelection=' + concentration;
    let response = await fetch(url);
    let requirements: Requirements;
    console.log(response);
    
    if (response.status == 200) {
      let body = await response.json()      
      requirements = new Requirements(body)
    }
    
    return new Promise((resolve, reject) => {
      if (requirements) {
        resolve(requirements)
      }
      else {   
        reject()
      }
    })
  }
}
