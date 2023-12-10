import { Firestore } from '@google-cloud/firestore';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FireStoreService {
  private database: Firestore;
  private readonly logger = new Logger(FireStoreService.name);

  constructor(private configService: ConfigService) {
    try {
      this.database = new Firestore({
        projectId: this.configService.get<string>('GOOGLE_PROJECT_ID'),
      });
    } catch (error) {
      this.logger.error('Failed to initialize Firebase Admin SDK', error);
      throw new InternalServerErrorException(
        'Failed to initialize Firebase: ' + error.message,
      );
    }
  }

  getDb(): Firestore {
    return this.database;
  }
}
