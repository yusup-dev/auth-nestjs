import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setDescription('A RESTful API for user authentication, providing secure registration and login functionalities. This API allows users to create an account, authenticate with their credentials, and access protected resources using token-based authentication.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
