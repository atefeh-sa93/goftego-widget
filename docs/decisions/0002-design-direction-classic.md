# 0002. Visual design direction: classic panel (option A)

- **Status:** Accepted
- **Date:** 2026-11-04
- **Decided by:** @atefeh-sa93

## Context

Five directions were mocked up in [`docs/design/options.html`](../design/options.html):
A classic, B minimal, C welcome card, D side sheet, E dark compact.
The 1.0 scope is three working days, so the choice also decides how much
extra feature work the design pulls in.

## Options considered

| Option                                                                | Pros                                                       | Cons                                                      |
| --------------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------- |
| A · Classic: accent header, message bubbles, round launcher           | Familiar to users, built entirely with the planned 1.0 API | Less distinctive                                          |
| B · Minimal: hairline header, bubble-less replies, text pill launcher | Calm, typographic                                          | Text launcher takes more space; strings need i18n         |
| C · Welcome card: start screen with suggestions                       | Friendly, guides first question                            | Needs a new `suggestions` API and a start screen (~½ day) |
| D · Side sheet: full-height panel from the edge                       | Room for long answers                                      | Needs a new layout mode and more tests; fits 1.1          |
| E · Dark compact                                                      | Shows theming power                                        | Same structure as A, only colours differ                  |

## Decision

Ship **A (classic)** as the default look of 1.0.

## Why

It needs no API beyond what 1.0 already defines, so it keeps the three-day
scope intact, and users recognise the pattern immediately.

## Consequences and limitations

- E can be added later as a theme preset in the demos, since it only changes `--gc-*` values.
- C and D are recorded as roadmap candidates, not 1.0 work.
