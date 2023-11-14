import { SousTache } from "./soustache";

export class Tache{
    constructor(
        public id:number,
        public libelle:string,
        public heureVendu:number,
        public statut: string,
        public employes: number[],
        public progression: number,
        public sousTaches: SousTache[],
        public spenttime:number
    ){}
}