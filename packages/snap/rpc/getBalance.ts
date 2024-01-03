import { AccountData, initApi } from '../polkadot/api';

export async function getBalance(address: string) {
  const polkadotApi = await initApi();

  const { data } = (await polkadotApi.query.system.account(
    address,
  )) as unknown as {
    data: AccountData;
  };

  return data.free.toString();
}
