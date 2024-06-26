import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';
import { assert, object, string } from 'superstruct';
import getAddress from '../rpc/getAddress';
import { getBalance } from '../rpc/getBalance';
import { transfer } from '../rpc/transfer';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('This custom confirmation is just for display purposes.'),
            text(
              'But you can edit the snap source code to make it do something, if you want to!',
            ),
          ]),
        },
      });
    case 'getAddress':
      return await getAddress();
    case 'getBalance':
      assert(request.params, object({ address: string() }));
      return await getBalance(request.params.address);
    case 'transfer':
      assert(
        request.params,
        object({
          to: string(),
          amount: string(),
        }),
      );
      return await transfer(request.params.to, request.params.amount);

    default:
      throw new Error('Method not found.');
  }
};
