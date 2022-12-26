import React from 'react'
import {Menu} from '../../../../src/view/shell/mobile/Menu'
import renderer from 'react-test-renderer'
import {render} from '../../../../jest/test-utils'

describe('Menu', () => {
  const mockedProps = {
    visible: true,
    onClose: jest.fn(),
  }
  it('matches snapshot', () => {
    const tree = renderer.create(<Menu {...mockedProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('tests', () => {
    render(<Menu {...mockedProps} />)
  })
})