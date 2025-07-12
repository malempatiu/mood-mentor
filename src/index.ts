import { App } from './App';
import { config } from './config/config';
import { MoodSummaryController } from './controllers/MoodSummaryController';

new App({
  controllers: [new MoodSummaryController()],
  port: config.port,
}).listen();
