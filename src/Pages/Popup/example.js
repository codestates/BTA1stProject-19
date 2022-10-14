import * as velasWeb3 from '@velas/web3';

export default function () {
  const configKey = new velasWeb3.PublicKey('Config1111111111111111111111111111111111111');
  console.log(configKey.toBase58());
  // alert('Hi! (find me on src/js/popup/example.js)');
}
