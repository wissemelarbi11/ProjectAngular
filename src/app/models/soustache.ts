import { Employee } from "./employee";

export class SousTache{
    constructor(
        public id:number,
        public libelle:string,
        public heureVendu:number,
        public statut: string,
        public employes: number[],
        public spenttime:number
    ){}
}