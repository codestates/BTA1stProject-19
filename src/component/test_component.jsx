import React from 'react'
import { hot } from 'react-hot-loader'
import icon from '../img/icon-128.png'
import { useRecoilState, selector, useRecoilValue } from 'recoil'
import { recoilPageState } from '../states/recoilPageState'
import TestButton from './button_component'

const TestComponent = () => {
  const [page, setPage] = useRecoilState(recoilPageState)

  return (
    <div>
      <p>{page}Hello!!, find me on src/js/popup/greeting_component.jsx</p>
      <img src={icon} />
      <TestButton page={page} setPage={setPage} />
    </div>
  )
}

export default hot(module)(TestComponent)
