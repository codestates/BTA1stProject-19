import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { hot } from 'react-hot-loader'
import { recoilNetWork } from '../states/recoilPageState'
import { Button } from '@material-ui/core'
import { Connection } from '@velas/web3'
import { makeStyles } from '@material-ui/core/styles'
import copy from 'copy-to-clipboard'

const AccountComponent = () => {
  const [netWork, setNetwork] = useRecoilState(recoilNetWork)
  const [publicKey, setPublicKey] = useState('')
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    getBalance()
  }, [])

  const getBalance = async () => {
    const connection = new Connection(netWork.RPC)
    chrome.storage.local.get('publicKey', async result => {
      const tempPublicKey = result.publicKey
      setPublicKey(tempPublicKey)
      const tempBalance = await connection.getBalance(publicKey)
      setBalance(tempBalance)
    })
  }

  const copyPublicKey = () => {
    copy(publicKey)
    alert('Copied')
  }

  const classes = makeStyles(() => ({
    container: {
      marginTop: 15,
    },
    textAlignCenter: {
      textAlign: 'center',
    },
    accountDiv: {},
    account: {
      fontSize: 20,
    },
    velasDiv: {
      textAlign: 'center',
      marginTop: 30,
      marginBottom: 30,
    },
  }))()

  return (
    <div className={classes.container}>
      <div className={classes.textAlignCenter}>
        <div className={classes.account}>Account 1</div>
        <Button onClick={copyPublicKey}>
          {publicKey.substring(0, 5)}...
          {publicKey.substring(publicKey.length - 5)}
        </Button>
      </div>
      <div className={classes.velasDiv}>
        <img src="https://velas.com/assets/img/logo-footer.svg"></img>
      </div>
      <div className={classes.textAlignCenter}>
        <h1>{balance} VLX</h1>
      </div>
    </div>
  )
}

export default hot(module)(AccountComponent)
