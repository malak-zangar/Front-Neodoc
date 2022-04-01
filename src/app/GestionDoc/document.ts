import { Byte } from "@angular/compiler/src/util";

export class Document {
    id: number;
    titre: string;
    url: string;
    type:string;
    data:Byte[];
  }