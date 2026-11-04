# goftego-widget

Framework-agnostic embeddable AI chat widget built with Lit web components and Shadow DOM.

> **Status:** in development toward 1.0. Follow progress in
> [Issues](https://github.com/atefeh-sa93/goftego-widget/issues) and
> [Milestones](https://github.com/atefeh-sa93/goftego-widget/milestones).

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/goftego-widget@1/dist/loader.js"></script>
<goftego-chat endpoint="/api/chat" title="Support" lang="fa" dir="rtl"></goftego-chat>
```

## Design

The default look is the **classic panel**: accent-coloured header, message
bubbles and a round launcher. Five directions were compared before choosing;
see [`docs/design/options.html`](docs/design/options.html) and
[ADR 0002](docs/decisions/0002-design-direction-classic.md).

## Decision log

Every decision in this project is made explicitly and recorded as an
[Architecture Decision Record](docs/decisions/). Each pull request lists the
decisions it implements.

| # | Decision | Choice | Status |
| - | -------- | ------ | ------ |
| [0001](docs/decisions/0001-record-decisions-as-adrs.md) | How decisions are recorded | ADR + PR section + this table | Accepted |
| [0002](docs/decisions/0002-design-direction-classic.md) | Visual design direction | A · Classic panel | Accepted |

## Roadmap

- **1.0:** custom element, Shadow DOM isolation, CSS-variable theming, lazy panel, SSE streaming, typed DOM events, RTL and i18n, accessibility, React/Vue/plain HTML demos.
- **1.1:** inline mode, conversation persistence in `sessionStorage`; candidates: welcome card with suggestions, side-sheet layout.
- **1.2:** Declarative Shadow DOM for SSR.

## Project management

Tasks live as GitHub issues grouped by milestone. They were generated from
[`scripts/github/tasks.json`](scripts/github/tasks.json) with
[`scripts/github/setup_github.py`](scripts/github/setup_github.py).
Workflow per task: issue → branch → decisions (ADR) → PR with `Closes #N` → CI → squash merge.
