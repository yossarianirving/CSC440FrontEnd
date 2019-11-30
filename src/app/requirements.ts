export class Requirements {
  // GenEd requirements should be numbers
  genEdE1: string;
  genEdE2: string;
  genEdE3: string;
  genEdE4: string;
  genEdE5: string;
  genEdE6: string;
  writingIntensive: string; // Should be a boolean or an array of possible classes
  acct: string; // Should be an array of classes
  core: string; // Should be an array of classes
  supporting: string; // Should be an array of classes
  concentration: string; // Should be an array of classes
  constructor(json: object) {
    let keys = Object.keys(json);

    keys.forEach(key => {
      this[key] = json[key]
    })
  }
}