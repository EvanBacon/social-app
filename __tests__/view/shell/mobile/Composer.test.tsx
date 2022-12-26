import React from 'react'
import {Composer} from '../../../../src/view/shell/mobile/Composer'
import renderer from 'react-test-renderer'
import {render} from '../../../../jest/test-utils'

describe('Composer', () => {
  jest.useFakeTimers()
  const mockedProps = {
    active: true,
    winHeight: 844,
    replyTo: {
      author: {avatar: undefined, displayName: 'Alice', handle: 'alice.test'},
      cid: 'bafyreieucrv36ylxrut4dr4jj264q2jj2vt2vfvhjfchgw3vua4gksvzia',
      text: 'Captain, maybe we ought to turn on the searchlights now. No… that’s just what they’ll be expecting us to do.',
      uri: 'at://did:plc:v3xz273ea2dzjpu2szsjzfue/app.bsky.feed.post/3jkcir3fhqv2u',
    },
    onPost: jest.fn(),
    onClose: jest.fn(),
  }
  it('matches snapshot', () => {
    const tree = renderer.create(<Composer {...mockedProps} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('tests', () => {
    render(<Composer {...mockedProps} />)
  })
})