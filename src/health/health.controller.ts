import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prisma: PrismaService,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: 'Check application health' })
  @ApiResponse({ status: 200, description: 'Application is healthy' })
  @ApiResponse({ status: 500, description: 'Application is unhealthy' })
  async check() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return this.health.check([]);
    } catch (error) {
      throw new Error('Database connection failed');
    }
  }
}