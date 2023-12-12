import * as wf from '@temporalio/workflow';
import * as activities from '../activities';

const { initiateSigning, completeSigning, checkStatus } = wf.proxyActivities<typeof activities>({
  startToCloseTimeout: '10 minutes',
});

export async function signMessageWorkflow(id: string, message: string, privateKey: string): Promise<void> {
  await initiateSigning(id, message, privateKey);
  await wf.sleep('1 minute'); // sleep for one minute before updating the signing status
  await completeSigning(id);
}

export async function checkStatusWorkflow(
  id: string
): Promise<{ completed: boolean; signedMessage?: string } | undefined> {
  const stored = await checkStatus(id);

  if (stored === undefined) {
    return undefined;
  } else {
    if (!stored.completed) {
      return { completed: stored.completed };
    } else {
      return stored;
    }
  }
}
