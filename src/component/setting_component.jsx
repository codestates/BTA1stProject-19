import React from 'react'
import {hot} from "react-hot-loader";
import { recoilPageState } from '../states/recoilPageState'
import {useRecoilState} from "recoil";
import {Box, Button, Card, CardContent, CardHeader, makeStyles, Typography} from "@material-ui/core";
import {Page} from "../enum/enum";

const SettingComponent = () => {
  const [page, setPage] = useRecoilState(recoilPageState)

  const classes = makeStyles(() => ({
    buttonBox: {
      marginTop: '20px',
    },
  }))()

  const handleClickClearWallet = () => {
    chrome.storage.local.clear()
    setPage(Page.LOGIN)
  }


  return (
    <div>
      <Box className={classes.container}>
        <Card>
          <CardContent>
            <Typography variant='h6'>지갑 초기화</Typography>
            <Typography>
              지갑이 초기화되면 더이상 이용할 수 없습니다.
              비밀 복구 문구를 사용하면 지갑을 다시 불러올 수 있습니다.
            </Typography>
            <Box className={classes.buttonBox}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth={true}
                onClick={handleClickClearWallet}
              >
                지갑 초기화
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  )
}

export default hot(module)(SettingComponent)
