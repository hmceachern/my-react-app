import { createColumnHelper, ColumnDef } from '@tanstack/react-table';

type Spell = {
  name: string;
  school: string;
  subschool: string;
  descriptor: string;
  spell_level: string;
  casting_time: string;
  components: string;
  costly_components: string;
  range: string;
  area: string;
  effect: string;
  targets: string;
  duration: string;
  dismissible: string;
  shapeable: string;
  saving_throw: string;
  spell_resistance: string;
  description: string;
  description_formatted: string;
  source: string;
  full_text: string;
  verbal: string;
  somatic: string;
  material: string;
  focus: string;
  divine_focus: string;
  sor: string;
  wiz: string;
  cleric: string;
  druid: string;
  ranger: string;
  bard: string;
  paladin: string;
  alchemist: string;
  summoner: string;
  witch: string;
  inquisitor: string;
  oracle: string;
  antipaladin: string;
  magus: string;
  adept: string;
  deity: string;
  sla_level: string;
  domain: string;
  short_description: string;
  acid: string;
  air: string;
  chaotic: string;
  cold: string;
  curse: string;
  darkness: string;
  death: string;
  disease: string;
  earth: string;
  electricity: string;
  emotion: string;
  evil: string;
  fear: string;
  fire: string;
  force: string;
  good: string;
  language_dependent: string;
  lawful: string;
  light: string;
  mind_affecting: string;
  pain: string;
  poison: string;
  shadow: string;
  sonic: string;
  water: string;
  linktext: string;
  id: string;
  material_costs: string;
  bloodline: string;
  patron: string;
  mythic_text: string;
  augmented: string;
  mythic: string;
  bloodrager: string;
  shaman: string;
  psychic: string;
  medium: string;
  mesmerist: string;
  occultist: string;
  spiritualist: string;
  skald: string;
  investigator: string;
  hunter: string;
  haunt_statistics: string;
  ruse: string;
  draconic: string;
  meditative: string;
  summoner_unchained: string;
};

const columnHelper = createColumnHelper<Spell>();

function generateColumns(data: Spell[]): ColumnDef<Spell, any>[] {
  if (!data || data.length === 0) return [];

  const keys = Object.keys(data[0]) as (keyof Spell)[];

  return keys.map(key => {
    const spellkey = key.replaceAll('_', ' ');
    return columnHelper.accessor(key, {
      header: () => spellkey.charAt(0).toUpperCase() + spellkey.slice(1), // Capitalize first letter for header
      cell: info => info.getValue(),
    });
  });
}

export default generateColumns;
