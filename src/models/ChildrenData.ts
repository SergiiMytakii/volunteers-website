

export class ChildrenData {
    id: string;
    name: string;
    nameEn: string;
    age: string;
    dream: string;
    dreamEn: string;
    imgSrc: string;
    fundOpen: boolean;
    desiredAmount: number;
    funded: number;
  
    constructor(data: {
      id: string;
      name: string;
      nameEn: string;
      age: string;
      dream: string;
      dreamEn: string;
      imgSrc: string;
      fundOpen: boolean;
      desiredAmount: number;
      funded: number;
    }) {
      this.id = data.id;
      this.name = data.name;
      this.nameEn = data.nameEn;
      this.age = data.age;
      this.dream = data.dream;
      this.dreamEn = data.dreamEn;
      this.imgSrc = data.imgSrc;
      this.fundOpen = data.fundOpen;
      this.desiredAmount = data.desiredAmount;
      this.funded = data.funded;
    }

  }
  