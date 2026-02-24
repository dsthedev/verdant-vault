// import { Link, routes } from '@cedarjs/router'
import { useState } from 'react'

import { Metadata } from '@cedarjs/web'

import { Button } from 'src/components/ui/button'

const HomePage = () => {
  const [counter, setCounter] = useState(0)

  return (
    <>
      <Metadata title="Home" description="Home page" />

      <h1 className="text-3xl">Verdant Vault</h1>

      <Button variant="outline" onClick={() => setCounter(counter + 1)}>
        Click Me ({counter})
      </Button>
      <Button variant="destructive" onClick={() => setCounter(0)}>
        Reset
      </Button>
    </>
  )
}

export default HomePage
