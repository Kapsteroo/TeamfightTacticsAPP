import { Champion } from '../app/models/champion';

export function makeChampion(overrides: Partial<Champion> = {}): Champion {
  return {
    name: 'Jinx',
    cost: 5,
    health: '700',
    mana: 100,
    armor: 20,
    mr: 20,
    dps: '50',
    damage: '50',
    atkspd: 0.75,
    crit: '25%',
    range: 4,
    champImage: 'jinx.png',
    skillName: '',
    skillImage: '',
    skillDesc: '',
    skillInfo: [],
    trait: 'Scrap',
    trait2: 'Sister',
    class: 'Rival',
    ...overrides,
  };
}
