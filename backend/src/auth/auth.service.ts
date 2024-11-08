import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDTO } from './dtos/RegisterUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { Repository } from 'typeorm';
import { hash } from "bcryptjs"

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}
  async registerUser(user: RegisterUserDTO) {
    try {
      await this.userRepo.save(new User({
        ...user,
        password: await hash(user.password, 3)
      }))
      return {
        status: true,
        message: "New user registered"
      }
    } catch (error: any) {
      throw new ConflictException("Some error occured while registering the user")
    }
  }
}
