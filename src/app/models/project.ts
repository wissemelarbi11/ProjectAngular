import { Tache } from "./tache";

export class Project {
    
    constructor(
        public id: number,
        public nomProjet: any,
        public heureVendu: number,
        public progression: number,
        public echeance: Date,
        public statut: string,
        public employes: number[],
        public taches: Tache[],
        public spenttime:number
    ) { }
}
