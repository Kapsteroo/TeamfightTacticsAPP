export interface Trait {
  /** Firestore document id */
  id?: string;
  name: string;
  bonus: string | undefined;
  bonusDesc: string[];
  traitImage: string;
  levels: Array<number>;
}
