import React, {useState} from 'react'
import {useRecoilState} from 'recoil'
import {hot} from 'react-hot-loader'
import {recoilPageState} from '../states/recoilPageState'
import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography
} from "@material-ui/core";
import {Page} from "../enum/enum";
import {StoreAccountInfo} from "../api/account";

const RecoverAccountComponent = () => {
  const [page, setPage] = useRecoilState(recoilPageState)
  const [typedMnemonics, setTypedMnemonics] = useState(Array.from({ length: 12 }, () => ''))
  const [password, setPassword] = useState('')
  const [completePassword, setCompletePassword] = useState(false)
  const [step, setStep] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChangePassword = (e) => {
    setPassword(e.target.value)
    const validateResult = validatePassword(password, )
    setCompletePassword(validateResult)
  }

  const handleChangeConfirm = (e) => {
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

  const classes = makeStyles(() => ({
    container: {
      textAlign: 'center',
      marginTop: '20px',
    },
    mnemonicNotice: {
      textAlign: 'left',
    },
    button: {
      width: "45%",
      margin: '8px'
    },
    mnemonicGrid: {
      margin: '10px -12px 20px',
    },
    passwordContainer: {
      margin: '100px auto 0',
    },
    inputContainer: {
      width: '176px',
      padding: '20px 0 10px',
      margin: '0 auto',
    },
    margin: {
      marginTop: '8px'
    }
  }))();

  const handleGoToLogin = () => {
    setPage(Page.LOGIN)
  }

  const handleCheckMnemonic = async () => {
    const mnemonicString = typedMnemonics.join(' ')
    StoreAccountInfo(mnemonicString, password)
      .then(() => {
        setPage(Page.ACCOUNT)
      })
  }

  const handleChangeMnemonic = (value, index) => {
    const newTypedMnemonic = [...typedMnemonics]
    newTypedMnemonic[index] = value
    setTypedMnemonics(newTypedMnemonic)
    console.log(newTypedMnemonic)
  }

  const handleStepMnemonic = () => {
    setStep(1)
  }

  return (
    <div>
      <Container className={classes.container}>
        {
          step === 0 &&
          <Box className={classes.passwordContainer}>
            <Box>
              <Typography variant={'h6'}>
                비밀 번호 초기화
              </Typography>
              <Typography variant={'subtitle1'}>
                기존 비밀 번호는 초기화 됩니다.<br/>
                새로운 비밀 번호를 입력해주세요.
              </Typography>
            </Box>
            <Box className={classes.inputContainer}>
              <TextField
                type="password"
                required
                label="New password"
                placeholder="New password"
                onChange={handleChangePassword}
              />
              <Box />
              <TextField
                required
                type="password"
                error={errorMessage.length > 0}
                label="Confirm password"
                placeholder="Confirm password"
                onChange={handleChangeConfirm}
                helperText={errorMessage}
              />
              <Box className={classes.margin}/>
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
        }
        {
          step === 1 &&
          <Box>
            <Box className={classes.mnemonicNotice}>
              <Typography variant="h5" gutterBottom>지갑 초기화</Typography>
              <Typography variant="subtitle2" gutterBottom>
                계정을 해제하는데 문제가 있는 경우, 지갑 설정 시 사용한 비밀 복구 구문을 사용해야합니다.
                이 작업이 완료되면 지갑이 초기화됩니다.
              </Typography>
              <Typography variant="caption" display="block" color="error" gutterBottom>
                정확한 비밀 복구 구문을 입력해주세요!
              </Typography>
            </Box>
            <Box>
              <Grid container spacing={3} className={classes.mnemonicGrid}>
                {typedMnemonics.length > 0 &&
                  typedMnemonics.map((mnemonic, index) => {
                    return (
                      <Grid item xs={6} key={index}>
                        <TextField
                          onChange={ e => {
                            handleChangeMnemonic(e.target.value, index)
                          }}
                          label={index + 1}
                        />
                      </Grid>
                    )
                  })}
              </Grid>
            </Box>
            <Box>
              <Button
                className={classes.button}
                variant="outlined"
                onClick={handleGoToLogin}>
                뒤로
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleCheckMnemonic}>
                복구
              </Button>
            </Box>
          </Box>
        }
      </Container>
    </div>
  )
}

export default hot(module)(RecoverAccountComponent)
