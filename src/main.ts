import { NestFactory } from '@nestjs/core';
import cluster from 'cluster';
import { cpus } from 'os';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  if (cluster.isMaster) {
    cluster.schedulingPolicy = cluster.SCHED_RR;
    console.log(`Master ${process.pid} is running`);
    const cpuCount = cpus().length;
    for (let i = 0; i < cpuCount; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code: number) => {
      if (code !== 0 && !worker.exitedAfterDisconnect) {
        console.log(
          `Worker ${worker.id} crashed. ` + 'Starting a new worker...',
        );
        cluster.fork();
      }
    });
  } else {
    console.log(`Worker ${process.pid} started`);
    await app.listen(process.env.APP_PORT || 3000);
  }
}

bootstrap();
