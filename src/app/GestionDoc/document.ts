import { Byte } from "@angular/compiler/src/util";
import { Tag } from "./tag";

export class Document {
   /* id: number;
    titre: string;
    type:string;
    data:Byte[];
    tags:Tag[];
    dep:string;
    tag: Set<string>;*/
    id: number;
    name: string;
    contentType:string;
    //data:Byte[];
    tags:Tag[];
    dep:string;
    tag: Set<string>;
  }

