import { Request, Response } from 'express';
import { SigningService } from '../services';

export class SignController {
  static async initiateSigning(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { message } = req.body;

    await SigningService.signMessage(id, message);

    return res.json({ status: 'success', message: 'Signing process initiated' });
  }

  static async checkStatus(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const signingProcess = await SigningService.getSigningProcess(id);

    if (signingProcess) {
      return res.json(signingProcess);
    } else {
      return res.status(404).json({ status: 'error', message: 'Signing process not found' });
    }
  }
}
