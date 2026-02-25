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
import { ModeCycle } from 'src/components/ui/mode-cycle'

type DefaultLayoutProps = {
  children?: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { isAuthenticated, logOut } = useAuth()

  const menuItems = [
    { label: 'Login', to: routes.login() },
    { label: 'Signup', to: routes.signup() },
  ]
  const userMenuItems = [
    // { label: 'Dashboard', to: routes.dashboard() },
    { label: 'Locations', to: routes.locations() },
  ]

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
                        <button className="w-full" onClick={logOut}>
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

      <main className="max-w-2xl mx-auto px-4 my-4">{children}</main>

      <footer className="my-8">
        <div className="flex items-center justify-center max-w-2xl mx-auto px-4 py-6 gap-4 flex-col md:flex-row">
          <span className="flex md:order-last">
            &copy; {new Date().getFullYear()} Verdant Vault
          </span>
          <ModeCycle></ModeCycle>
        </div>
      </footer>
    </>
  )
}

export default DefaultLayout
