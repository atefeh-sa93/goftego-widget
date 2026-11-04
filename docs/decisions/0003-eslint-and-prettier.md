# 0003. Lint and format with ESLint + Prettier

- **Status:** Accepted
- **Date:** 2026-11-04
- **Decided by:** @atefeh-sa93
- **Issue / PR:** #2

## Context

The project needs linting and consistent formatting from the first commit,
and CI will fail on lint errors. Web-component code has its own mistakes
(e.g. forgetting `super.connectedCallback()`, binding to attributes vs.
properties in Lit templates) that a generic linter does not catch.

## Options considered

| Option                          | Pros                                                                                           | Cons                           |
| ------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------ |
| ESLint (flat config) + Prettier | `eslint-plugin-lit` and `eslint-plugin-wc` catch Lit and custom-element mistakes; widely known | Two tools, more config, slower |
| Biome                           | One fast tool, minimal config                                                                  | No Lit / web-component rules   |

## Decision

Use ESLint with `typescript-eslint`, `eslint-plugin-lit` and
`eslint-plugin-wc`, and Prettier for formatting (`eslint-config-prettier`
turns off rules that conflict with it).

## Why

The Lit and web-component rules are worth more than raw speed in a project
whose whole point is correct custom-element behaviour.

## Consequences and limitations

- Slightly slower lint runs than Biome.
- pnpm is used as the package manager, as planned for CI.
