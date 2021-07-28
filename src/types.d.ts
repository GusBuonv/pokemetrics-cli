export interface AggregatePokemetrics {
  weight: number,
  height: number,
}

export interface PokemetricsSummary extends AggregatePokemetrics {
  types: Record<string, AggregatePokemetrics>,
}
