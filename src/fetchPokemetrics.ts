import { PokemetricsSummary } from './types';

export interface FetchPokemetricsParams {
  /** The Pokédex number of the first Pokémon to query */
  offset: number,
  /** The maximum number of Pokémon to query */
  limit: number,
}

export default async function fetchPokemetrics({
  offset,
  limit,
}: FetchPokemetricsParams): Promise<PokemetricsSummary> {
  throw new Error('Not yet implemented');
}
