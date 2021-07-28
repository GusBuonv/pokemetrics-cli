import fetchPokemetrics from '../fetchPokemetrics';
import { Pokemetrics } from '../types';

it('does not throw', async () => {
  await fetchPokemetrics({ offset: 0, limit: 1 });
});

it('aggregates weight and height correctly', async () => {
  const { weight, height } = await fetchPokemetrics({ offset: 0, limit: 10 });

  expect(weight).toBe(357.8);
  expect(height).toBe(10.5);
});

it('aggregates type weight and height correctly', async () => {
  expect.assertions(12);

  const expected: Record<string, Pokemetrics> = {
    grass: {
      weight: (69 + 130 + 1000) / 3,
      height: (7 + 10 + 20) / 3,
    },
    poison: {
      weight: (69 + 130 + 1000) / 3,
      height: (7 + 10 + 20) / 3,
    },
    fire: {
      weight: (85 + 190 + 905) / 3,
      height: (6 + 11 + 17) / 3,
    },
    water: {
      weight: (90 + 225 + 855) / 3,
      height: (5 + 10 + 16) / 3,
    },
    flying: {
      weight: 905,
      height: 17,
    },
    bug: {
      weight: 29,
      height: 3,
    },
  };

  const { types } = await fetchPokemetrics({ offset: 0, limit: 10 });

  Object.entries(types).forEach(([type, { weight, height }]) => {
    expect(weight).toBe(expected[type]?.weight);
    expect(height).toBe(expected[type]?.height);
  });
});
