import React from 'react'
import { useRecoilState } from 'recoil'
import { hot } from 'react-hot-loader'
import { recoilPageState } from '../states/recoilPageState'
import { Button } from '@material-ui/core'

const ButtonComponent = () => {
  const [page, setPage] = useRecoilState(recoilPageState)

  const toNextPage = () => {
    setPage(page + 1)
  }

  return (
    <div>
      <Button variant="contained" onClick={toNextPage}>
        {' '}
        Test Button
      </Button>
    </div>
  )
}

export default hot(module)(ButtonComponent)
