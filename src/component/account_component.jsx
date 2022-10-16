import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { hot } from 'react-hot-loader'
import { recoilNetWork, recoilPageState } from '../states/recoilPageState'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import copy from 'copy-to-clipboard'
import * as velasWeb3 from '@velas/web3'
import { Page } from '../enum/enum'
import CopyIcon from '../img/copy-icon.svg'

const AccountComponent = () => {
  const [page, setPage] = useRecoilState(recoilPageState)
  const [netWork, setNetwork] = useRecoilState(recoilNetWork)
  const [publicKey, setPublicKey] = useState('')
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    // 지갑이 락 상태인경우
    chrome.storage.local.get('lock', result => {
      const lockStatus = result.lock
      if (lockStatus) {
        setPage(Page.LOGIN)
      }
      //밸런스 체크 시 에러가 난 경우
      getAccountBalance()
    })
  }

  const getAccountBalance = () => {
    const connection = new velasWeb3.Connection(netWork.RPC)
    chrome.storage.local.get('publicKey', async result => {
      try {
        const tempPublicKey = result.publicKey
        if (!tempPublicKey) throw 'not exist public key'

        setPublicKey(tempPublicKey)
        const publicKeyObj = new velasWeb3.PublicKey(tempPublicKey)
        const tempBalance = await connection.getBalance(publicKeyObj)
        setBalance(tempBalance)
      } catch (e) {
        console.log(e)
        // 퍼블릭 키를 가져오지 못하는 경우 로그인으로 이동
        if (e === 'not exist public key') {
          setPage(Page.LOGIN)
        }
      }
    })
  }

  const copyPublicKey = () => {
    copy(publicKey)
    alert('Copied')
  }

  const classes = makeStyles(() => ({
    container: {
      marginTop: 40,
    },
    textAlignCenter: {
      textAlign: 'center',
    },
    accountDiv: {},
    account: {
      fontSize: 20,
      marginBottom: 10,
    },
    velasDiv: {
      textAlign: 'center',
      marginTop: 30,
      marginBottom: 30,
    },
    copyIcon: {
      width: 20,
      height: 20,
      marginLeft: 5,
    },
  }))()

  return (
    <div className={classes.container}>
      <div className={classes.textAlignCenter}>
        <div className={classes.account}>My Account</div>
        <Button onClick={copyPublicKey}>
          {publicKey.substring(0, 5)}...
          {publicKey.substring(publicKey.length - 5)}
          <img src={CopyIcon} className={classes.copyIcon} />
        </Button>
      </div>
      <div className={classes.velasDiv}>
        <img src="https://velas.com/assets/img/logo-footer.svg"></img>
      </div>
      <div className={classes.textAlignCenter}>
        <h1>{balance / velasWeb3.LAMPORTS_PER_SOL} VLX</h1>
      </div>
    </div>
  )
}

export default hot(module)(AccountComponent)
