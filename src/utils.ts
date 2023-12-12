// src/utils.ts
import { createHash, createECDH } from 'crypto';

export function generateKeyPair(): { publicKey: string; privateKey: string } {
  const ecdh = createECDH('secp256k1');
  ecdh.generateKeys();

  return {
    publicKey: ecdh.getPublicKey('hex', 'compressed'),
    privateKey: ecdh.getPrivateKey('hex'),
  };
}
