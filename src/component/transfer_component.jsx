import React, { useState, useEffect, useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { hot } from 'react-hot-loader'
import { recoilPageState } from '../states/recoilPageState'
import { Button } from '@material-ui/core'
import { Page } from '../enum/enum'
import { Keypair, Connection, LAMPORTS_PER_SOL } from '@velas/web3'
import { makeStyles } from '@material-ui/core/styles'
import * as bs58 from 'bs58'
import { TextField } from '@material-ui/core'

const TransferComponent = () => {
  const [page, setPage] = useRecoilState(recoilPageState)
  const [balance, setBalance] = useState(0)
  const [targetAddress, setTargetAddress] = useState('')

  const toNextPage = () => {
    setPage(Page.START)
  }

  const onChange = e => {
    setTargetAddress(e.target.value)
  }

  const handleOnChange = useCallback(
    e => {
      onChange(e)
    },
    [onChange],
  )

  return (
    <div>
      <h1>송금 주소:</h1>
      <TextField
        id="target-address"
        label="송금 주소"
        value={targetAddress}
        onChange={handleOnChange}
      />
    </div>
  )
}

export default hot(module)(TransferComponent)
