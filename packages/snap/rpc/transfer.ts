import { heading, panel, text } from '@metamask/snaps-ui';
import getKeyPair from '../polkadot/getKeyPair';
import { initApi } from '../polkadot/api';

export async function transfer(
  to: string,
  amount: string,
): Promise<{ signature: string } | void> {
  const isConfirmed = await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Confirm Transfer'),
        text(`Are you sure you want to transfer ${amount} to ${to}?`),
      ]),
    },
  });

  if (isConfirmed) {
    const user = await getKeyPair();
    const api = await initApi();

    const transferTransaction = await api.tx.balances
      .transferKeepAlive(to, amount)
      .signAndSend(user);

    console.log('paymentInfo', transferTransaction);
    console.log(JSON.stringify(transferTransaction));
  }
}
