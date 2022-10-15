import React from 'react'
import { useRecoilState } from 'recoil'
import { hot } from 'react-hot-loader'
import { recoilPageState } from '../states/recoilPageState'
import { Button } from '@material-ui/core'

const ButtonComponent = (props) => {
  const [page, setPage] = useRecoilState(recoilPageState)
  // eslint-disable-next-line react/prop-types
  const {pageURL} = props

  const toNextPage = () => {
    setPage(pageURL)
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
