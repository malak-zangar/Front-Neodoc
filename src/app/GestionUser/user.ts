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

/*constructor(firstName: string, lastName: string,username:string, email: string,poste:string,actif:boolean, password: string, fav : Document[]){
this.firstname = firstName;
this.lastname = lastName;
this.username=username;
this.email = email;
this.poste=poste
this.actif=actif;
this.password = password;
this.doc_favoris=fav;
this.role = ['user'];
  }*/

}
