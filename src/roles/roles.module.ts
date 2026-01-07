import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RoleRepository } from './repository/role.repository';

@Module({
  controllers: [RolesController],
  providers: [RolesService, RoleRepository],
  imports: [TypeOrmModule.forFeature([Role]), AuthModule],
})
export class RolesModule {}
