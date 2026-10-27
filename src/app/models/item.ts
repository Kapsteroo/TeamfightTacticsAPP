export interface Item {
  /** Firestore document id */
  id?: string;
  name: string;
  description: string;
  image: string;
  component1?: string;
  component2?: string;
}
