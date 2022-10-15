import React from 'react'
import {selector, useRecoilValue} from 'recoil'
import icon from '../img/icon-128.png'
import {hot} from 'react-hot-loader'
import TestButton from './button_component'
import {recoilPageState} from '../states/recoilPageState'
import {Page} from "../enum/enum";
import {makeStyles} from "@material-ui/core";
import Login from "./login_component";
import NewAccount from "./new_account_component";
import RestoreAccount from "./restore_account_component";

const GreetingComponent = () => {
  const recoilPageStateSelector = selector({
    key: 'recoilPageState',
    get: ({ get }) => {
      return get(recoilPageState)
    },
  })
  const page = useRecoilValue(recoilPageStateSelector)

  // useEffect(() => {
  //   getBalance()
  // }, [])
  // const connection = new Connection('https://api.devnet.solana.com')

  // const keypair = Keypair.generate()
  // const publicKey = keypair.publicKey.toBase58()
  // const secretKey = keypair.secretKey
  // const secretKeyBS58 = bs58.encode(keypair.secretKey)
  // console.log(`public key: ${publicKey}}`)
  // console.log(`private key(raw): ${secretKey}`)
  // console.log(`private key(bs58): ${secretKeyBS58}`)

  // const getBalance = async () => {
  //   const feePayer = Keypair.fromSecretKey(bs58.decode(secretKeyBS58))
  //   console.log('feePayer', feePayer)
  //   let balance = await connection.getBalance(feePayer.publicKey)
  //   console.log(`${balance / LAMPORTS_PER_SOL} SOL`)
  // }

/*
useEffect(() => {
  const network = useRecoilValue(recoilNetworkStateSelector)
    console.log(network)
    const mnemonic = CreateMnemonic()
    console.log(mnemonic)
    CreateAccountByMnemonic(mnemonic, "test")
  })*/

  const classes = makeStyles(() => ({
    appRoot : {
      paddingTop: "56px"
    }
  }))()

  const render = () => {
    switch (page) {
      case Page.START:
        return (
          <div>
            <p>{page}Hello!!, find me on src/js/popup/greeting_component.jsx</p>
            <img src={icon} />
            <TestButton pageURL={Page.LOGIN}/>
          </div>
        )
      case Page.LOGIN:
        return (
          <div>
            <Login/>
          </div>
        )
      case Page.ACCOUNT:
        return <div>Account</div>
      case Page.NEW_ACCOUNT:
        return <div><NewAccount/></div>
      case Page.RESTORE_ACCOUNT:
        return <div><RestoreAccount/></div>
      default:
        return null
    }
  }

  return <div id="App"><div className={classes.appRoot}>{render()}</div></div>
}

export default hot(module)(GreetingComponent)
