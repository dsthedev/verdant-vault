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

---

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

---

## dbAuth & User System

Ensure you have a local postgres db running, with a user assigned to it, and managed with a tool like TablePlus. The connection string will look something like this:

```env
DATABASE_URL=postgresql://user:password@localhost:1234/dbname
TEST_DATABASE_URL=postgresql://user:password@localhost:1234/dbnametest
```

Then, CedarJS has scaffolding to get started with an in-house auth system:

```sh
cjs setup auth dbAuth &&
cjs prisma migrate dev
```

With a very basic user flow working, I recommend altering the main menu to handle the login/logout process something like this:

```tsx
<MenubarContent align="end">
  {isAuthenticated ? (
    <>
      {userMenuItems.map((item) => (
        <MenubarItem key={item.label} asChild>
          <Link to={item.to}>{item.label}</Link>
        </MenubarItem>
      ))}
      <MenubarItem asChild>
        <button className="justify-start" onClick={logOut}>
          <LogOut />
          Logout
        </button>
      </MenubarItem>
    </>
  ) : (
    <>
      {menuItems.map((item) => (
        <MenubarItem key={item.label} asChild>
          <Link to={item.to}>{item.label}</Link>
        </MenubarItem>
      ))}
    </>
  )}
</MenubarContent>
```

And don't forget, now you can wrap pages in a private set and send unauthenticated users to the login page:

```tsx
<PrivateSet wrap={DefaultLayout} unauthenticated="login" roles={['guest']}>
  <Route path="/dashboard" page={DashboardPage} name="dashboard" />
</PrivateSet>
```

### Enforce Valid Email & Strong Password

To enforce valid emails and strong passwords, create shared validation utilities that both the API and web sides can use:

**Step 1:** Create `api/src/lib/validation.ts` with email and password validation functions.

**Step 2:** Update `api/src/functions/auth.ts` to import and use password validation in the `validateEmail` (handler) & `passwordValidation` functions during signup:

```tsx
passwordValidation: (password) => {
  const validation = validatePassword(password)
  if (!validation.valid) {
    throw new PasswordValidationError(validation.error)
  }
  return true
},
```

**Step 3:** Update auth forms (`SignupPage`, `LoginPage`, `ForgotPasswordPage`) to import the validators from `api/src/lib/validation` and add them to the `validate` property in field validation.

**Why this approach?** The validation logic lives in the API folder so both sides can import it—ensuring consistency between client and server validation. Server-side password validation provides security (never trust client input), while client-side validation provides immediate user feedback for better UX.

**Password requirements:** 8+ characters, uppercase, lowercase, number, and special character.

---

## Actually Send Emails

There isn't much point in requiring user's to login with a valid email if they can't send themselves a forgot password link. Or if you want to send them something in the future like to validate email or send an invoice.

`coming soon!`
