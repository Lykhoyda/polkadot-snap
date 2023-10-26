import { ApiPromise, HttpProvider } from '@polkadot/api';
import type { Struct } from '@polkadot/types-codec';
import type { Balance } from '@polkadot/types/interfaces/runtime';

const KUSAMA_RPC_URL = 'https://kusama-rpc.polkadot.io/';

export type AccountData = {
  readonly free: Balance;
} & Struct;

async function initApi(): Promise<ApiPromise> {
  let provider: HttpProvider;

  try {
    provider = new HttpProvider(KUSAMA_RPC_URL);
  } catch (error) {
    console.error('Error on provider creation', error);
    throw error;
  }

  const apiPromise = new ApiPromise({ provider });
  await apiPromise.isReady;

  return apiPromise;
}

export async function getBalance(address: string) {
  const polkadotApi = await initApi();

  const { data } = (await polkadotApi.query.system.account(
    address,
  )) as unknown as {
    data: AccountData;
  };

  return data.free.toString();
}
