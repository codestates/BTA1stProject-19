import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import icon from '../img/icon-128.png'
import { hot } from 'react-hot-loader'
import TestButton from './button_component'
import { recoilPageState, recoilNetWork } from '../states/recoilPageState'
import { Page } from '../enum/enum'
import { makeStyles } from '@material-ui/core'
import Login from './login_component'
import NewAccount from './new_account_component'
import RestoreAccount from './restore_account_component'
import Account from './account_component'
import Transfer from './transfer_component'
import * as crypto from 'crypto-js'

const GreetingComponent = () => {
  const [page, setPage] = useRecoilState(recoilPageState)
  const classes = makeStyles(() => ({
    appRoot: {
      paddingTop: '56px',
    },
  }))()

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
      case Page.RESTORE_ACCOUNT:
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
      <div className={classes.appRoot}>{render()}</div>
    </div>
  )
}

export default hot(module)(GreetingComponent)
