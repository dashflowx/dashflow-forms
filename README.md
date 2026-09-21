# @dashflowx/forms

Zod + react-hook-form on `@dashflowx/core` primitives. Editor uses the same JSON schema.

C08 has not published `@dashflowx/core@1.0.0` yet (new npm account). Local develop uses `file:../dashflowx-core`.

```bash
cd dashflow-forms
yarn install
yarn test
yarn storybook   # http://localhost:6007
```

No database. Invalid email fails Zod closed.

## Packages

| Package | Contents |
| --- | --- |
| `@dashflowx/forms` | Free fields + `useDashflowForm` + JSON renderer |
| `@dashflowx/forms-pro` | Repeater / wizard / file stubs (private) |

Do not `npm publish` until X05 (M06).
