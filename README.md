# PokéMetrics-CLI

A toy cli to query and return biometric data (height & weight) on Pokémon

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/en/)

### Set Up

- Install the project:
  - `yarn install` *OR*
  - `npm install`
- Invoke the cli:
  - `yarn pokemetrics --offset <integer> --limit <integer>` *OR*
  - `npx pokemetrics --offset <integer> --limit <integer>`

## **Documentation**

### *Inputs*

#### `--offset <integer>`

The Pokédex number of the first Pokémon to query.

#### `--limit <integer>`

The maximum number of Pokémon to query.

### *Output*

1. The average weight and height of the Pokémon in the queried list
2. A list of the average weight and height of each unique Pokémon type in the queried list
3. The total runtime of the CLI invocation
