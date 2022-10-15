import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { hot } from 'react-hot-loader'
import { recoilPageState } from '../states/recoilPageState'
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core'
import { CreateAccountByMnemonic, CreateMnemonic } from '../api/keyPair'
import * as crypto from 'crypto-js'

const NewAccountComponent = () => {
  const [page, setPage] = useRecoilState(recoilPageState)
  const [password, setPassword] = useState('')
  const [step, setStep] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [mnemonics, setMnemonics] = useState([])
  const [typedMnemonics, setTypedMnemonics] = useState([])
  const [confirmMnemonics, setConfirmMnemonics] = useState([])
  const [completeMnemonic, setCompleteMnemonic] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const handleChangePassword = e => {
    setPassword(e.target.value)
  }

  const handleChangeConfirm = e => {
    const confirmPassword = e.target.value
    setErrorMessage(confirmPassword !== password ? '비밀번호가 다릅니다.' : '')
  }

  const handleStepMnemonic = () => {
    setStep(1)
    scrollToTop()
    if (mnemonics.length === 0) {
      const mnemonicArray = CreateMnemonic().split(' ')
      setMnemonics(mnemonicArray)
      setTypedMnemonics(Array.from({ length: mnemonicArray.length }, () => ''))
      setConfirmMnemonics(Array.from({ length: mnemonicArray.length }, () => 0))
    }
  }

  const handleStepConfirmMnemonic = () => {
    scrollToTop()
    setStep(2)
  }

  const handleCheckSeedPhase = (value, index) => {
    const checkMNemonic = mnemonics[index]
    const newConfirmValue = [...confirmMnemonics]
    newConfirmValue[index] = checkMNemonic === value ? 1 : 2
    setConfirmMnemonics(newConfirmValue)

    const newTypedMnemonic = [...typedMnemonics]
    newTypedMnemonic[index] = value
    setTypedMnemonics(newTypedMnemonic)

    const filledComplete = newConfirmValue.every(value => value == 1)
    setCompleteMnemonic(filledComplete)
  }

  const handleCompleteAll = () => {
    try {
      const { publicKey, secretKey } = CreateAccountByMnemonic(
        mnemonics.join(' '),
        password,
      )

      const encPassword = crypto.SHA256(password).toString(crypto.enc.Hex)
      const encSecretKey = crypto.AES.encrypt(secretKey, encPassword).toString()
      chrome.storage.local.set({ publicKey: publicKey })
      chrome.storage.local.set({ mnemonics: mnemonics.join(' ') })
      chrome.storage.local.set({ password: encPassword })
      chrome.storage.local.set({ secretKey: encSecretKey })
    } catch (e) {
      console.log(e)
    }
  }

  const classes = makeStyles(() => ({
    container: {
      textAlign: 'center',
    },
    inputContainer: {
      padding: '5px 0 10px',
    },
    passwordContainer: {
      width: '176px',
      margin: '100px auto 0',
    },
    mnemonicContainer: {
      margin: '20px auto',
    },
    mnemonicNotice: {
      textAlign: 'left',
    },
    mnemonicGrid: {
      margin: '10px -12px 20px',
    },
    button: {
      width: '45%',
      margin: '8px',
    },
  }))()
  return (
    <div>
      <Container className={classes.container}>
        {step === 0 && (
          <Box className={classes.passwordContainer}>
            <Box>
              <Typography variant={'subtitle1'}>
                비밀 번호를 입력해주세요.
              </Typography>
            </Box>
            <Box className={classes.inputContainer}>
              <TextField
                type="password"
                required
                label="password"
                placeholder="password"
                multiline
                onChange={handleChangePassword}
              />
              <Box />
              <TextField
                required
                type="password"
                error={errorMessage.length > 0}
                label="confirm password"
                placeholder="confirm password"
                multiline
                onChange={handleChangeConfirm}
                helperText={errorMessage}
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleStepMnemonic}
                fullWidth={true}
              >
                확인
              </Button>
            </Box>
          </Box>
        )}
        {step === 1 && (
          <Box className={classes.mnemonicContainer}>
            <Box className={classes.mnemonicNotice}>
              <Typography variant="h5" gutterBottom>
                비밀 복구 구문
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                비밀 백업 구문을 이용하면 계정을 쉽게 백업하고 복구할 수
                있습니다.
                <br />이 구문을 기억하세요.
              </Typography>
              <Typography
                variant="caption"
                display="block"
                color="error"
                gutterBottom
              >
                경고: 비밀 복구 구문은 절대로 공개하지 마세요.
              </Typography>
            </Box>
            <Grid container spacing={3} className={classes.mnemonicGrid}>
              {mnemonics.length > 0 &&
                mnemonics.map((mnemonic, index) => {
                  return (
                    <Grid item xs={6} key={mnemonic}>
                      <TextField
                        disabled={true}
                        defaultValue={mnemonic}
                        label={index + 1}
                      />
                    </Grid>
                  )
                })}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={handleStepConfirmMnemonic}
              fullWidth={true}
            >
              확인
            </Button>
          </Box>
        )}
        {step === 2 && (
          <Box className={classes.mnemonicContainer}>
            <Box className={classes.mnemonicNotice}>
              <Typography variant="h5" gutterBottom>
                비밀 복구 구문 확인
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                각 구문을 순서대로 입력해서 올바른지 확인하세요.
              </Typography>
            </Box>
            <Grid container spacing={3} className={classes.mnemonicGrid}>
              {confirmMnemonics.length > 0 &&
                confirmMnemonics.map((value, index) => {
                  return (
                    <Grid item xs={6} key={index}>
                      <TextField
                        error={value === 2}
                        defaultValue={typedMnemonics[index]}
                        label={index + 1}
                        onChange={e => {
                          handleCheckSeedPhase(e.target.value, index)
                        }}
                      />
                    </Grid>
                  )
                })}
            </Grid>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={handleStepMnemonic}
            >
              다시보기
            </Button>
            <Button
              className={classes.button}
              disabled={!completeMnemonic}
              variant="contained"
              color="primary"
              onClick={handleCompleteAll}
            >
              확인
            </Button>
          </Box>
        )}
      </Container>
    </div>
  )
}

export default hot(module)(NewAccountComponent)
