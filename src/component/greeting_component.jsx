import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import icon from '../img/icon-128.png'
import { hot } from 'react-hot-loader'
import TestButton from './button_component'
import { recoilPageState } from '../states/recoilPageState'
import { Page } from '../enum/enum'
import { makeStyles } from '@material-ui/core'
import Login from './login_component'
import NewAccount from './new_account_component'
import RestoreAccount from './recover_account_component'
import Account from './account_component'
import Transfer from './transfer_component'
import * as crypto from 'crypto-js'
import NavComponent from "./nav_component";

const GreetingComponent = () => {
  const [page, setPage] = useRecoilState(recoilPageState)
  const [isLockWallet, setIsLockWallet] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const classes = makeStyles(() => ({
    appRoot: {
      paddingTop: '56px',
    },
  }))()

  useEffect(() => {
    init()
  }, [page])

  const init = () => {
    // 지갑이 락 상태인경우
    chrome.storage.local.get('lock', result => {
      const lockStatus = result.lock
      setIsLockWallet(!!lockStatus)
    })
    //로그인 상태가 아닌 경우
    chrome.storage.local.get('publicKey', result => {
      const publicKey = result.publicKey
      setIsLogin(!!publicKey)
    })
  }

  const render = () => {
    switch (page) {
      case Page.START:
        return (
          <div>
            <p>{page}Hello!!, find me on src/js/popup/greeting_component.jsx</p>
            <img src={icon} />
            <TestButton pageURL={Page.LOGIN} />
          </div>
        )
      case Page.LOGIN:
        return (
          <div>
            <Login />
          </div>
        )
      case Page.ACCOUNT:
        return (
          <div>
            <Account />
          </div>
        )
      case Page.NEW_ACCOUNT:
        return (
          <div>
            <NewAccount />
          </div>
        )
      case Page.RECOVER_ACCOUNT:
        return (
          <div>
            <RestoreAccount />
          </div>
        )
      case Page.TRANSFER:
        return (
          <div>
            <Transfer />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div id="App">
      {
        !isLockWallet &&
        isLogin &&
        <NavComponent/>
      }
      <div className={classes.appRoot}>{render()}</div>
    </div>
  )
}

export default hot(module)(GreetingComponent)
