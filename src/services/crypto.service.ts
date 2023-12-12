import crypto from 'crypto';

export class CryptoService {
  private static keypair: { publicKey: string; privateKey: string } | undefined;

  static generateKeypair(): { publicKey: string; privateKey: string } {
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });

    return { publicKey, privateKey };
  }

  static getKeyPair(): { publicKey: string; privateKey: string } {
    if (!this.keypair) {
      this.keypair = this.generateKeypair();
    }

    return this.keypair;
  }
}
