import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { hot } from 'react-hot-loader'
import { recoilPageState } from '../states/recoilPageState'
import { Button } from '@material-ui/core'
import { Page } from '../enum/enum'
import { Keypair, Connection, LAMPORTS_PER_SOL } from '@velas/web3'
import { makeStyles } from '@material-ui/core/styles'
import * as bs58 from 'bs58'
import copy from 'copy-to-clipboard'
import { fontSize } from '@material-ui/system'

const AccountComponent = () => {
  const [page, setPage] = useRecoilState(recoilPageState)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    getBalance()
  }, [])

  const connection = new Connection('https://api.devnet.solana.com')

  const keypair = Keypair.generate()
  const publicKey = keypair.publicKey.toBase58()
  const secretKey = keypair.secretKey
  const secretKeyBS58 = bs58.encode(keypair.secretKey)
  console.log(`public key: ${publicKey}}`)
  console.log(`private key(raw): ${secretKey}`)
  console.log(`private key(bs58): ${secretKeyBS58}`)

  const getBalance = async () => {
    const feePayer = Keypair.fromSecretKey(bs58.decode(secretKeyBS58))
    console.log('feePayer', feePayer)
    const tempBalance = await connection.getBalance(feePayer.publicKey)
    setBalance(tempBalance)
    console.log(`${balance / LAMPORTS_PER_SOL} SOL`)
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
