import { Reference } from '@angular/compiler/src/render3/r3_ast';

export interface BaseItem {
  name: string | undefined;
  description: string | undefined;
  image: Reference;
}