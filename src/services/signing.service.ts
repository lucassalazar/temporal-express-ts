import { TemporalService } from './temporal.service';
import { CryptoService } from './crypto.service';
import { signMessageWorkflow, checkStatusWorkflow } from '../workflows';
import { nanoid } from 'nanoid';

export class SigningService {
  static async signMessage(id: string, message: string): Promise<void> {
    const client = await TemporalService.getClient();
    const { privateKey } = CryptoService.getKeyPair();

    const workflowId = 'workflow-' + nanoid();

    await client.workflow.start(signMessageWorkflow, {
      taskQueue: 'signing-task',
      args: [id, message, privateKey],
      workflowId,
    });
  }

  static async getSigningProcess(id: string): Promise<{ completed: boolean; signedMessage?: string } | undefined> {
    const client = await TemporalService.getClient();

    const handle = await client.workflow.start(checkStatusWorkflow, {
      taskQueue: 'signing-task',
      args: [id],
      workflowId: 'workdlow-' + nanoid(),
    });

    const result = await handle.result();
    return result;
  }
}
