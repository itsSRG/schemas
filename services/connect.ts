import { options } from "@frequency-chain/api-augment";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { Keyring } from "@polkadot/api";
import { KeyringPair } from "@polkadot/keyring/types";

// DEPLOY_SCHEMA_ENDPOINT_URL (environment variable)
// The value is a URL for the RPC endpoint.  e.g. ws://localhost:9944
export async function getFrequencyAPI() {
  const DefaultWsProvider = new WsProvider(getEndpoint());

  // The "options" parameter pulls in the Frequency API extrinsics
  const api = await ApiPromise.create({
    provider: DefaultWsProvider,
    ...options,
  });
  await api.isReady;
  return api;
}

export function getEndpoint() {
  let DEPLOY_SCHEMA_ENDPOINT_URL = process.env.DEPLOY_SCHEMA_ENDPOINT_URL;
  if (DEPLOY_SCHEMA_ENDPOINT_URL === undefined) {
    // One would think that localhost would also work here but it doesn't consistently.
    DEPLOY_SCHEMA_ENDPOINT_URL = "ws://127.0.0.1:9944";
  }
  return DEPLOY_SCHEMA_ENDPOINT_URL;
}

// DEPLOY_SCHEMA_ACCOUNT_URI (environment variable)
// The value is a URI for the account.  e.g. //Alice or a mnemonic (seed words)
export const getSignerAccountKeys = (): KeyringPair => {
  const keyring = new Keyring();

  let DEPLOY_SCHEMA_ACCOUNT_URI = process.env.DEPLOY_SCHEMA_ACCOUNT_URI;
  if (DEPLOY_SCHEMA_ACCOUNT_URI === undefined) {
    DEPLOY_SCHEMA_ACCOUNT_URI = "//Alice";
  }
  return keyring.addFromUri(DEPLOY_SCHEMA_ACCOUNT_URI, {}, "sr25519");
};
