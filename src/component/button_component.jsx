import React from 'react'
import { useRecoilState } from 'recoil'
import { hot } from 'react-hot-loader'
import { recoilPageState } from '../states/recoilPageState'

const ButtonComponent = () => {
  const [page, setPage] = useRecoilState(recoilPageState)

  const toNextPage = () => {
    setPage(page + 1)
  }

  return (
    <div>
      <button id="submitButton" onClick={toNextPage}>
        Test Button
      </button>
    </div>
  )
}

export default hot(module)(ButtonComponent)
