import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';
import { HealthController } from '@/health/health.controller';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [PrismaService],
})
export class HealthModule {}