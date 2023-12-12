import crypto from 'crypto';

const signingStatusStore: Record<string, { completed: boolean; signedMessage: string }> = {};

export async function initiateSigning(
  id: string,
  message: string,
  privateKey: string
): Promise<{ completed: boolean; signedMessage: string }> {
  const sign = crypto.createSign('SHA256');

  sign.update(message);

  const signature = sign.sign(privateKey, 'base64');

  signingStatusStore[id] = {
    completed: false,
    signedMessage: signature,
  };

  return signingStatusStore[id];
}

export async function completeSigning(id: string, signedMessage: string): Promise<void> {
  if (signingStatusStore[id]) {
    signingStatusStore[id].completed = true;
  } else {
    signingStatusStore[id] = {
      completed: true,
      signedMessage,
    };
  }
}

export async function checkStatus(id: string): Promise<{ completed: boolean; signedMessage: string } | undefined> {
  return signingStatusStore[id];
}
