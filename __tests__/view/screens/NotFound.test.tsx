import React from 'react'
import {NotFound} from '../../../src/view/screens/NotFound'
import renderer from 'react-test-renderer'
import {render} from '../../../jest/test-utils'

describe('NotFound', () => {
  it('matches snapshot', () => {
    const tree = renderer.create(<NotFound />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('tests', () => {
    render(<NotFound />)
  })
})