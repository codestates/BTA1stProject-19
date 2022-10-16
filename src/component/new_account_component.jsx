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
import {CreateMnemonic } from '../api/keyPair'
import {scrollToTop} from "../common/scroll";
import {StoreAccountInfo, UnlockWallet,} from "../api/account";
import {Page} from "../enum/enum";

const NewAccountComponent = () => {
  const [page, setPage] = useRecoilState(recoilPageState)
  const [password, setPassword] = useState('')
  const [step, setStep] = useState(0)
  const [completePassword, setCompletePassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [mnemonics, setMnemonics] = useState([])
  const [typedMnemonics, setTypedMnemonics] = useState([])
  const [confirmMnemonics, setConfirmMnemonics] = useState([])
  const [completeMnemonic, setCompleteMnemonic] = useState(false)

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
    const validateResult = validatePassword(password, )
    setCompletePassword(validateResult)
  }

  const handleChangeConfirmPassword = e => {
    const confirmPassword = e.target.value
    const validateResult = validatePassword(password, confirmPassword)
    setCompletePassword(validateResult)
  }

  const validatePassword = (password, confirmPassword) => {
    if (password.length < 8) {
      setErrorMessage('비밀번호는 8자 이상 입력해주세요.')
      return false
    }

    if (confirmPassword !== password) {
      setErrorMessage('비밀번호가 다릅니다.')
      return false
    }

    setErrorMessage('')
    return true
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
    const mnemonicString = mnemonics.join(' ')
    StoreAccountInfo(mnemonicString, password)
      .then(() => {
        UnlockWallet()
        setPage(Page.ACCOUNT)
      })
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
      paddingBottom: '20px',
    },
    mnemonicNotice: {
      textAlign: 'left',
    },
    mnemonicGrid: {
      margin: '10px -12px 20px',
    },
    button: {
      flex: 1,
      margin: '3px'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between'
    }
  }))()
  return (
    <div>
      <Container className={classes.container}>
        {step === 0 && (
          <Box className={classes.passwordContainer}>
            <Box>
              <Typography variant={'subtitle1'}>
                비밀번호를 입력해주세요.
              </Typography>
            </Box>
            <Box className={classes.inputContainer}>
              <TextField
                type="password"
                required
                label="password"
                placeholder="password"
                onChange={handleChangePassword}
              />
              <Box />
              <TextField
                required
                type="password"
                error={errorMessage.length > 0}
                label="confirm password"
                placeholder="confirm password"
                onChange={handleChangeConfirmPassword}
                helperText={errorMessage}
              />
            </Box>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleStepMnemonic}
                fullWidth={true}
                disabled={!completePassword}
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
                있습니다. 다른 기기에서 지갑을 불러오거나 초기화된 이후
                비밀 복구 구문을 이용해야합니다.
                <br />이 구문을 기억하세요.
              </Typography>
              <Typography
                variant="caption"
                display="block"
                color="error"
                gutterBottom
              >
                경고: 비밀 복구 구문은 절대로 공개하지 마세요. <br/>
                비밀 복구 구문을 잊어버린 경우 다시 복원 할 수 없습니다.
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
            <Box className={classes.buttonContainer}>
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
          </Box>
        )}
      </Container>
    </div>
  )
}

export default hot(module)(NewAccountComponent)
