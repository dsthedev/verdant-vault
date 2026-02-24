import { render } from '@cedarjs/testing/web'

import DefaultLayout from './DefaultLayout'

//   Improve this test with help from the CedarJS Testing Doc:
//   https://cedarjs.com/docs/testing#testing-pages-layouts

describe('DefaultLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DefaultLayout />)
    }).not.toThrow()
  })
})
