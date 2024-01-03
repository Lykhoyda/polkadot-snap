import getKeyPair from '../polkadot/getKeyPair';

async function getAddress() {
  const keypair = await getKeyPair();

  return keypair.address;
}

export default getAddress;
