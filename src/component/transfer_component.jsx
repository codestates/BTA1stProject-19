import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { hot } from 'react-hot-loader'
import { recoilPageState, recoilNetWork } from '../states/recoilPageState'
import { Page } from '../enum/enum'
import { Button, Container, makeStyles, TextField } from '@material-ui/core'
import * as velasWeb3 from '@velas/web3'
import { IsSecretKeyValid } from '../api/keyPair'
import * as bs58 from 'bs58'
import * as crypto from 'crypto-js'
import TransactionResultModal from './transaction_result_modal_component'

const TransferComponent = () => {
  const [page, setPage] = useRecoilState(recoilPageState)
  const [netWork, setNetwork] = useRecoilState(recoilNetWork)
  const [publicKey, setPublicKey] = useState('')
  const [balance, setBalance] = useState(0)
  const [targetAddress, setTargetAddress] = useState('')
  const [amount, setAmount] = useState(0)
  const [password, setPassword] = useState('')
  const [open, setOpen] = useState(false)
  const [transactionHash, setTransactionHash] = useState('')
  const [txStatus, setTxStatus] = useState(true)

  useEffect(() => {
    getAccountBalance()
  }, [])

  const onChangeAddress = e => {
    setTargetAddress(e.target.value)
  }

  const onChangeAmount = e => {
    setAmount(e.target.value)
  }

  const onChangePassword = e => {
    setPassword(e.target.value)
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

  const transfer = async () => {
    const isValidAccount = await IsValidAccount()
    if (isValidAccount) {
      const encPassword = crypto.SHA256(password).toString(crypto.enc.Hex)
      chrome.storage.local.get('password', async result => {
        const storagePassword = result.password
        if (!storagePassword) {
          alert('지갑 정보가 존재하지 않습니다. 계정 복구를 진행해주세요.')
          return
        }

        if (encPassword === storagePassword) {
          chrome.storage.local.get('secretKey', async result => {
            const encSecretKey = result.secretKey
            const decSecretKey = crypto.AES.decrypt(encSecretKey, encPassword)
            const originalSecretKey = decSecretKey.toString(crypto.enc.Utf8)
            const sender = velasWeb3.Keypair.fromSecretKey(
              bs58.decode(originalSecretKey),
            )

            if (IsSecretKeyValid(originalSecretKey)) {
              try {
                const fromPublicKey = new velasWeb3.PublicKey(publicKey)
                const toPubKey = new velasWeb3.PublicKey(targetAddress)
                let transaction = new velasWeb3.Transaction().add(
                  velasWeb3.SystemProgram.transfer({
                    fromPubkey: fromPublicKey,
                    toPubkey: toPubKey,
                    lamports: amount * velasWeb3.LAMPORTS_PER_SOL,
                  }),
                )
                transaction.feePayer = fromPublicKey
                const connection = new velasWeb3.Connection(netWork.RPC)
                const transferSignature =
                  await velasWeb3.sendAndConfirmTransaction(
                    connection,
                    transaction,
                    [sender],
                  )

                setTransactionHash(transferSignature)
                setOpen(true)
                setTxStatus(true)
              } catch (e) {
                console.log(e)
                setOpen(true)
                setTxStatus(false)
              }
            } else {
              alert('계정이 존재하지 않습니다.')
              return
            }
          })
        } else {
          alert('패스워드가 일치하지 않습니다')
          return
        }
      })
    } else {
      alert('송금 주소를 확인해주세요.')
    }
  }

  const IsValidAccount = async () => {
    try {
      new velasWeb3.PublicKey(targetAddress)
    } catch (e) {
      console.log(e)
      if (e.toString().includes('Error: Invalid public key input')) {
        return false
      }
    }
    return true
  }

  const handleClose = () => {
    setOpen(!open)
    setPage(Page.ACCOUNT)
  }

  const classes = makeStyles(() => ({
    container: {
      textAlign: 'center',
      marginTop: '15px',
    },
    transferButton: {
      marginTop: '30px',
    },
    amount: {
      fontSize: '25px',
    },
    vlx: {
      fontSize: '15px',
      marginLeft: '5px',
    },
    currentAmountDiv: {
      marginBottom: '30px',
    },
  }))()

  return (
    <div>
      <Container className={classes.container}>
        <TransactionResultModal
          open={open}
          handleClose={handleClose}
          status={txStatus}
          transactionHash={transactionHash}
        />
        <div className={classes.currentAmountDiv}>
          <h2>현재 자산 </h2>
          <span className={classes.amount}>
            {balance / velasWeb3.LAMPORTS_PER_SOL}
            <span className={classes.vlx}>VLX</span>
          </span>
        </div>
        <h2>송금 주소</h2>
        <TextField
          id="target-address"
          label="*Address"
          value={targetAddress}
          onChange={onChangeAddress}
        />
        <div className={classes.currentAmount}></div>
        <h2>송금 금액</h2>
        <TextField
          id="target-address"
          label="*Amount"
          value={amount}
          onChange={onChangeAmount}
        />
        <h2>비밀번호</h2>
        <TextField
          id="password"
          label="password"
          value={password}
          onChange={onChangePassword}
          type="password"
        />
        <Button
          className={classes.transferButton}
          variant="contained"
          color="primary"
          fullWidth={true}
          onClick={transfer}
        >
          송금하기
        </Button>
      </Container>
    </div>
  )
}

export default hot(module)(TransferComponent)
