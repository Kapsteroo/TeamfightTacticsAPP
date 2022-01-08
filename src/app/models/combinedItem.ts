import { BaseItem } from './baseItem';

export interface CombinedItem {
  name: string | undefined;
  description: string | undefined;
  image: String | undefined;
  component1: BaseItem;
  component2: BaseItem;
}
