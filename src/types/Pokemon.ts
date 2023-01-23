export type Pokemon = {
  name?: string;
  id?: number;
  spriteFront?: string
  spriteBack?: string
  shiny?: string
  types?: string[]
  stats?: [{ base_stat: string; stat: { name: string } }];
};
