export interface Pokemetrics {
  weight: number,
  height: number,
}

export interface AggregatePokemetrics extends Pokemetrics {
  types: Record<string, Pokemetrics>,
}

export interface RawPokemetricsType {
  type: {
    name: string,
  },
}

export interface RawPokemetricsNode extends Pokemetrics {
  types: Array<RawPokemetricsType>,
}

export interface RawPokemetrics {
  data: {
    pokemetrics: {
      aggregate: {
        avg: Pokemetrics,
      },
      nodes: Array<RawPokemetricsNode>,
    },
  },
}
