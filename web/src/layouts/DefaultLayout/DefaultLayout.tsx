import { LogOut, Menu } from 'lucide-react'

import { Link, routes } from '@cedarjs/router'

import { useAuth } from 'src/auth'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from 'src/components/ui/menubar'

type DefaultLayoutProps = {
  children?: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { isAuthenticated, logOut } = useAuth()

  const menuItems = [
    { label: 'Login', to: routes.login() },
    { label: 'Signup', to: routes.signup() },
  ]
  const userMenuItems = [{ label: 'Dashboard', to: routes.dashboard() }]

  return (
    <>
      <header>
        <div className="max-w-2xl mx-auto px-4">
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
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4">{children}</main>

      <footer>
        <div className="max-w-2xl mx-auto px-4 py-6">
          <span>&copy; {new Date().getFullYear()} Verdant Vault</span>
        </div>
      </footer>
    </>
  )
}

export default DefaultLayout
