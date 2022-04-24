import { Document } from "../GestionDoc/document";
export class User {
    id: number;
    firstname: string;
    lastname: string;
    username:string;
    email: string;
    poste:string;
    actif: Boolean;
    password: String
    doc_favoris:Document[];
    role:string[];

}
