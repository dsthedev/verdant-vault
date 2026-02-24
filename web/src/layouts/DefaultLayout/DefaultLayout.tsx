import { Menu } from 'lucide-react'

import { Link, routes } from '@cedarjs/router'

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
                  <MenubarItem asChild>
                    <Link to={routes.dashboard()}>Dashboard</Link>
                  </MenubarItem>
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
