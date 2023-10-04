import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';

// eslint-disable-next-line jsdoc/require-description
/**
 *
 */
async function getAddress() {
  const polkadotTypeNode = await snap.request({
    method: 'snap_getBip44Entropy',
    params: {
      coinType: 434,
    },
  });

  const deriveAddressKey = await getBIP44AddressKeyDeriver(polkadotTypeNode);
  const addressKey0 = await deriveAddressKey(0);

  return addressKey0.address;
}

export default getAddress;
