import { App } from './App';
import { config } from './config/default';
import { MoodSummaryController } from './controllers/MoodSummaryController';
import { MoodEntriesRepository } from './repos/MoodEntriesRepository';
import { MoodSummaryService } from './services/MoodSummaryService';

new App({
  controllers: [
    new MoodSummaryController(
      new MoodSummaryService(new MoodEntriesRepository()),
    ),
  ],
  port: config.port,
}).listen();
