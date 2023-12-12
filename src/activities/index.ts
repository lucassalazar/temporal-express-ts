import crypto from 'crypto';

const signingStatusStore: Record<string, { completed: boolean; signedMessage: string }> = {};

export async function initiateSigning(id: string, message: string, privateKey: string): Promise<void> {
  const sign = crypto.createSign('SHA256');

  sign.update(message);

  const signature = sign.sign(privateKey, 'base64');

  signingStatusStore[id] = {
    completed: false,
    signedMessage: signature,
  };
}

export async function completeSigning(id: string): Promise<void> {
  signingStatusStore[id].completed = true;
}

export async function checkStatus(id: string): Promise<{ completed: boolean; signedMessage: string } | undefined> {
  return signingStatusStore[id];
}
