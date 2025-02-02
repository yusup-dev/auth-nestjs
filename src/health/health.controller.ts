import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { HealthCheckService, HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ERROR_MESSAGES } from 'src/common/constants/error-messages.constants';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prisma: PrismaService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Check application health' })
  @ApiResponse({
    status: 200,
    description: 'Application is healthy',
    schema: {
      example: {
        status: 'ok',
        info: {
          database: { status: 'up' },
        },
        error: {},
        details: {
          database: { status: 'up' },
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
    schema: {
      example: {
        message: 'Internal server error, please try again later',
      },
    },
  })
  @ApiResponse({
    status: 429,
    description: 'Too many requests, rate limit exceeded',
    schema: {
      example: {
        message: 'ThrottlerException: Too Many Requests',
      },
    },
  })
  async check(): Promise<HealthCheckResult> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return this.health.check([
        async () => ({
          app: {
            status: 'up',
          },
          database: {
            status: 'up',
          },
        }),
      ]);
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }
}
