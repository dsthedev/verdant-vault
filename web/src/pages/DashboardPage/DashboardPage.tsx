// import { Link, routes } from '@cedarjs/router'
import { Metadata } from '@cedarjs/web'

const DashboardPage = () => {
  return (
    <>
      <Metadata title="Dashboard" description="Dashboard page" />

      <h1>DashboardPage</h1>
      <p>
        Find me in <code>./web/src/pages/DashboardPage/DashboardPage.tsx</code>
      </p>
      {/*
          My default route is named `dashboard`, link to me with:
          `<Link to={routes.dashboard()}>Dashboard</Link>`
      */}
    </>
  )
}

export default DashboardPage
