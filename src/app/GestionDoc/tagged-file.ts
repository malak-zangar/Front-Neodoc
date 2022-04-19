import { Tag } from "./tag";

export class TaggedFile {
  id:number;
  name:string
  contentType:string
  size:number
  tags: Tag[] = [];
  progress:number = 0;
  isUploading: boolean = false;

  constructor(file:File) {
    this.name = file.name;
    this.contentType = file.type;
    this.size = file.size;
  }
}