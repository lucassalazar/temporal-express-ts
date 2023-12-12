import { Client, Connection } from '@temporalio/client';

export class TemporalService {
  private static client: Client;

  static async startClient(): Promise<void> {
    const connection = await Connection.connect({ address: 'localhost:7233' });
    this.client = new Client({ connection });
  }

  static async getClient() {
    if (!this.client) {
      await this.startClient();
    }

    return this.client;
  }
}
