import * as t from 'io-ts';
import { Pokemetrics, RawPokemetrics, RawPokemetricsNode, RawPokemetricsType } from './types';

export const PokemetricsC: t.Type<Pokemetrics, Pokemetrics, unknown> = t.type(
  {
    weight: t.number,
    height: t.number,
  },
  'Pokemetrics',
);

export const RawPokemetricsTypeC: t.Type<RawPokemetricsType, RawPokemetricsType, unknown> = t.type(
  {
    type: t.type({
      name: t.string,
    }),
  },
  'RawPokemetricsType',
);

export const RawPokemetricsNodeC: t.Type<RawPokemetricsNode, RawPokemetricsNode, unknown> = (
  t.intersection(
    [
      PokemetricsC,
      t.type({
        types: t.array(RawPokemetricsTypeC),
      }),
    ],
    'RawPokemetricsNode',
  )
);

export const RawPokemetricsC: t.Type<RawPokemetrics, RawPokemetrics, unknown> = t.type(
  {
    data: t.type({
      pokemetrics: t.type({
        aggregate: t.type({
          avg: PokemetricsC,
        }),
        nodes: t.array(RawPokemetricsNodeC),
      }),
    }),
  },
  'RawPokemetrics',
);
