# 0004. Use standard (TC39) decorators in Lit

- **Status:** Accepted
- **Date:** 2026-11-04
- **Decided by:** @atefeh-sa93
- **Issue / PR:** #2

## Context

Lit 3 supports three ways to declare reactive properties: TypeScript's
legacy `experimentalDecorators`, standard TC39 decorators (TypeScript 5+),
and plain `static properties` without decorators.

## Options considered

| Option                                                    | Pros                                                 | Cons                                                |
| --------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------- |
| Standard decorators (`@property() accessor open = false`) | The language standard; no experimental compiler flag | Fewer examples online; slightly larger output       |
| `experimentalDecorators`                                  | Most Lit tutorials use it                            | Non-standard TypeScript flag that is on its way out |
| `static properties`                                       | Smallest output, no transform                        | Types must be repeated by hand; noisier code        |

## Decision

Use standard decorators. `experimentalDecorators` stays off in `tsconfig.json`,
and every reactive property is declared with the `accessor` keyword.

## Why

A library that will be maintained under semver should build on the standard,
not on a flag TypeScript plans to retire.

## Consequences and limitations

- Every decorated reactive field needs `accessor`; forgetting it is a type error.
- Output is a little larger than `static properties`; size-limit (#4) will show the real cost.
