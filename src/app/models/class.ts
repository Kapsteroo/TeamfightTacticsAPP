export interface Class {
  /** Firestore document id */
  id?: string;
  name: string;
  bonus: string | undefined;
  bonusDesc: string[];
  classImage: string;
  levels: Array<number>;
}
