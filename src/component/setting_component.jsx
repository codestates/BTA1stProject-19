import React, {useState} from 'react'
import {hot} from "react-hot-loader";
import {recoilNetWork, recoilPageState} from '../states/recoilPageState'
import {useRecoilState} from "recoil";
import {Box, Button, Card, CardContent, makeStyles, Typography} from "@material-ui/core";
import {Network, Page} from "../enum/enum";
import * as velasWeb3 from "@velas/web3";
import {Connection, Keypair, LAMPORTS_PER_SOL} from "@velas/web3";
import TransactionResultModal from "./transaction_result_modal_component";

const SettingComponent = () => {
  const [page, setPage] = useRecoilState(recoilPageState)
  const [network, setNetwork] = useRecoilState(recoilNetWork)
  const [open, setOpen] = useState(false)
  const [transactionHash, setTransactionHash] = useState('')
  const [txStatus, setTxStatus] = useState(true)

  const classes = makeStyles(() => ({
    margin: {
      marginTop: '15px',
    },
  }))()

  const handleClickClearWallet = () => {
    chrome.storage.local.clear()
    setPage(Page.LOGIN)
  }

  const handleClickGetAirdrop = async () => {
    const connection = new Connection(network.RPC)
    chrome.storage.local.get('publicKey', async result => {
      const tempPublicKey = result.publicKey
      if (!tempPublicKey) throw 'not exist public key'

      try {
        const publicKeyObj = new velasWeb3.PublicKey(tempPublicKey)
        const airdropSignature = await connection.requestAirdrop(
          publicKeyObj,
          LAMPORTS_PER_SOL,
        )
        setTransactionHash(airdropSignature)
        setOpen(true)
        setTxStatus(true)
      } catch (e) {
        console.log(e)
        setOpen(true)
        setTxStatus(false)
      }
    });
  }

  const handleClose = () => {
    setOpen(!open)
  }

  return (
    <div>
      <TransactionResultModal
        open={open}
        handleClose = {handleClose}
        status={txStatus}
        transactionHash={transactionHash}
      />
      <Box>
        <Card>
          <CardContent>
            <Typography variant='h6'>테스트넷 코인 받기</Typography>
            <Typography>
              테스트넷에서 코인을 받아올 수 있습니다.
            </Typography>
            <Box className={classes.margin}>
              <Button
                variant="contained"
                color="primary"
                fullWidth={true}
                onClick={handleClickGetAirdrop}
              >
                코인 받기
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Card  className={classes.margin}>
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
