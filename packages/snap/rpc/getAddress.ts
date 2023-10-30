import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';
import { Keyring } from '@polkadot/api';

async function getAddress() {
  const polkadotTypeNode = await snap.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType: 434,
    },
  });

  const deriveAddressKey = await getBIP44AddressKeyDeriver(polkadotTypeNode);
  const addressKey0 = await deriveAddressKey(0);

  const keyring = new Keyring({ ss58Format: 2 });

  if (!addressKey0.privateKeyBytes) {
    throw new Error('No private key found');
  }

  return keyring.addFromSeed(addressKey0.privateKeyBytes).address;
}

export default getAddress;
