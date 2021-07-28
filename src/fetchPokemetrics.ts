import { pipe } from 'fp-ts/lib/function';
import { fold } from 'fp-ts/lib/Either';
import fetch from 'node-fetch';
import { RawPokemetricsC } from './Codecs';
import { Pokemetrics, AggregatePokemetrics, RawPokemetrics } from './types';

const pokemetricsQuery = `
query aggregate_pokemetrics($offset: Int, $limit: Int) {
  pokemetrics: pokemon_v2_pokemon_aggregate(offset: $offset, limit: $limit) {
    aggregate {
      avg {
        weight,
        height,
      }
    },
    nodes {
      weight,
      height,
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
    }
  }
}`;

export interface FetchPokemetricsParams {
  /** The Pokédex number of the first Pokémon to query */
  offset: number,
  /** The maximum number of Pokémon to query */
  limit: number,
}

export default async function fetchPokemetrics({
  offset,
  limit,
}: FetchPokemetricsParams): Promise<AggregatePokemetrics> {
  const response = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
    method: 'POST',
    body: JSON.stringify({
      query: pokemetricsQuery,
      variables: { offset, limit },
      operationName: 'aggregate_pokemetrics',
    }),
  });

  let result: AggregatePokemetrics;
  const raw: RawPokemetrics = await response.json();
  try {
    const { nodes, aggregate } = raw.data.pokemetrics;

    const types: Record<string, Pokemetrics> = {};
    const counts: Record<string, number> = {};

    nodes.forEach(({ weight, height, types: typeList }) => {
      typeList.forEach(({ type }) => {
        const { name } = type;
        if (types[name] && counts[name]) {
          types[name].height += height;
          types[name].weight += weight;
          counts[name] += 1;
        } else {
          types[name] = { height, weight };
          counts[name] = 1;
        }
      });
    });

    Object.keys(types).forEach((key) => {
      types[key].weight /= counts[key];
      types[key].height /= counts[key];
    });

    result = {
      ...aggregate.avg,
      types,
    };
  } catch (error) {
    const onLeft = () => {
      throw new TypeError('Invalid query result received');
    };
    const onRight = () => { throw error; };
    pipe(RawPokemetricsC.decode(raw), fold(onLeft, onRight));
    throw new Error('Impossible');
  }

  return result;
}
