export interface Champion {
  name: string;
  cost: number;
  health: string;
  mana: number;
  armor: number;
  mr: number;
  dps: string;
  damage: string;
  atkspd: number;
  crit: string;
  range: number;
  champImage: string;
  skillName: string;
  skillImage: string;
  skillDesc: string;
  skillInfo: Array<string>;
  trait: string;
  trait2?: string;
  class: string;
  class2?: string;
}
