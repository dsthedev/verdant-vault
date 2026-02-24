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

**First Steps for a Real App**

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

## Generate a Home Page, Dashboard, and Default Layout

```sh
cjs g page home / &&
cjs g page dashboard &&
cjs g layout default
```

Next step is to wire up the default layout to the home and dashboard pages and update `web/src/Routes.tsx`:

```tsx
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'

;<Set wrap={DefaultLayout}>
  <Route path="/dashboard" page={DashboardPage} name="dashboard" />
  <Route path="/" page={HomePage} name="home" />
</Set>
```

The reason for adding a default layout first is to get a basic nav working using the `Link and routes` from the `@cedarjs/router` package.

## ShadCN and Tailwind

There are a million options for UI, but I'm currently favoring the ShadCn and Tailwind "way".

```sh
yarn workspace web add tailwindcss @tailwindcss/vite &&
yarn workspace web add -D @types/node
echo '@import "tailwindcss";' >> web/src/index.css
```

Update `web/vite.config.mts` (yes, change the file type to mts for later):

```ts
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
...
export default defineConfig({
  plugins: [cedar(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
...
```

Update `web/tsconfig.json`:

```json
{
  "baseUrl": ".",
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

Run the init: `cd web && npx shadcn@latest init && cd -`

And I recommend making an alias that jumps into the web folder for adding new components:

```sh
shadadd () {
  cd web || return
  npx shadcn@latest add "$@"
  cd - || return
}
```

So you can run `shadadd button` from the project source folder!

### Test ShadCn and Tailwind

Add counter buttons on the home page like this:

```tsx
<Button variant="outline" onClick={() => setCounter(counter + 1)}>
  Click Me ({counter})
</Button>
<Button variant="destructive" onClick={() => setCounter(0)}>
  Reset
</Button>
```

And a menubar to the default layout like this:

```tsx
<div className="flex items-center justify-between py-2">
  <Link to={routes.home()} className="text-lg font-semibold">
    Verdant Vault
  </Link>

  <Menubar>
    <MenubarMenu>
      <MenubarTrigger aria-label="Open menu">
        <Menu />
      </MenubarTrigger>

      <MenubarContent align="end">
        <MenubarItem asChild>
          <Link to={routes.dashboard()}>Dashboard</Link>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</div>
```

If everything is working, There should be a functional shadcn menubar, and some clickable buttons, all relying on TailwindCSS. Sweet.

## dbAuth & User System

Connect a database. Setup dbAuth. Enforce good User practices.
