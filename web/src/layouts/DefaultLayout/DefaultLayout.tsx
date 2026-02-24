import { Link, routes } from '@cedarjs/router'

type DefaultLayoutProps = {
  children?: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to={routes.home()}>Home</Link>
            </li>
            <li>
              <Link to={routes.dashboard()}>Dashboard</Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
      <footer>
        <span>&copy; {new Date().getFullYear()} Verdant Vault</span>
      </footer>
    </>
  )
}

export default DefaultLayout
