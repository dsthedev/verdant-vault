# Installing and Setting Up a CedarJS App

Useful aliases:

```sh
alias ycca='yarn create cedar-app --typescript'
alias cjs='yarn cedar'
```

After creating:

```sh
cd verdant-vault
yarn install
cjs dev
```

The create-app command handles adding a git repo and initial commit.

## First Steps for a Real App

A "real" web app has:

- Local Databases for building and testing features
- Live Databases ready for deployed app
- Full User system via dbAuth and:
  - strong passord enforcement
  - email validation
  - email sending for signup/forgot password
  - signup access keys?
- A per-user "Feedback" model for users to submit feedback

The CedarJS tutorial is great, but I find myself frustrated that it doesn't lead to a useful project. By the end I want something I can deploy to a serverless host, let a few people sign up, and start developing features from there.

### Generate a Home Page, Dashboard, and Custom Layout

```sh
cjs g page home / &&
cjs g page dashboard &&
cjs g layout default
```

Next step is to wire up the default layout to the home and dashboard pages and update `web/src/Routes.tsx`:

```tsx
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'

<Set wrap={DefaultLayout}>
  <Route path="/dashboard" page={DashboardPage} name="dashboard" />
  <Route path="/" page={HomePage} name="home" />
</Set>
```

The reason for adding a default layout first is to get a basic nav working using the `Link and routes` from the `@cedarjs/router` package.

### ShadCN and Tailwind

There are a million options for UI, but I'm currently favoring the ShadCn and Tailwind "way".

`coming soon!`
