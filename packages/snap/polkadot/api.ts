import type { Struct } from '@polkadot/types-codec';
import type { Balance } from '@polkadot/types/interfaces/runtime';
import { ApiPromise, HttpProvider } from '@polkadot/api';

const ROCOCO_RPC_URL = 'https://rococo-rpc.polkadot.io/';

export type AccountData = {
  readonly free: Balance;
} & Struct;

export async function initApi(): Promise<ApiPromise> {
  let provider: HttpProvider;

  try {
    provider = new HttpProvider(ROCOCO_RPC_URL);
  } catch (error) {
    console.error('Error on provider creation', error);
    throw error;
  }

  const apiPromise = new ApiPromise({ provider });
  await apiPromise.isReady;

  return apiPromise;
}
