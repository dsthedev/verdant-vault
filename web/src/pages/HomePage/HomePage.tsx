// import { Link, routes } from '@cedarjs/router'
// import { useState } from 'react'

import { Link, routes } from '@cedarjs/router'
import { Metadata } from '@cedarjs/web'

import { useAuth } from 'src/auth'
import { Button } from 'src/components/ui/button'

// import { Button } from 'src/components/ui/button'

const HomePage = () => {
  // const [counter, setCounter] = useState(0)
  const { isAuthenticated } = useAuth()

  return (
    <>
      <Metadata title="Home" description="Home page" />
      <h1 className="text-xl">
        {isAuthenticated ? 'Welcome back' : 'Hello'}, Green Thumbed One!
      </h1>

      {isAuthenticated ? (
        <p className="my-8">
          Welcome back to Verdant Vault, your personal plant management system.
          Here you can track the growth and care of your plants, manage your
          inventory, and keep a journal of your plant care activities.
        </p>
      ) : (
        <p className="my-8">
          Welcome to Verdant Vault! Please log in to access your personal plant
          management system. Here you can track the growth and care of your
          plants, manage your inventory, and keep a journal of your plant care
          activities.
        </p>
      )}

      {isAuthenticated ? (
        <p className="my-8">
          <Link to={routes.locations()}>
            <Button variant="green" size="lg">
              View Plant Locations
            </Button>
          </Link>
        </p>
      ) : (
        <p className="my-8">
          <Link to={routes.login()}>
            <Button variant="blue" size="lg">
              Log in to Manage Plants
            </Button>
          </Link>
        </p>
      )}
    </>
  )
}

export default HomePage
