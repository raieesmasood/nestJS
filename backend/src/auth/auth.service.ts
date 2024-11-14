import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDTO } from './dtos/RegisterUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  // Register a new user
  async registerUser(user: RegisterUserDTO) {
    const userExists = await this.userRepo.findOne({ where: { email: user.email } });

    if (userExists) {
      throw new ConflictException('Email already in use');
    }

    try {
      const hashedPassword = await hash(user.password, 10);

      const newUser = this.userRepo.create({
        ...user,
        password: hashedPassword,
      });

      await this.userRepo.save(newUser);

      return {
        status: true,
        message: 'User registered successfully',
      };
    } catch (error) {
      console.error('Error during registration:', error);

      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }

      throw new ConflictException('Some error occurred while registering the user');
    }
  }

  // Login a user
  async loginUser(email: string, password: string) {
    // Find the user by email and include 'username' in the selection
    const user = await this.userRepo.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'name'], // Ensure username is selected
    });

    if (!user) {
      console.log('User not found');
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('User found:', user);

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Password does not match');
      throw new UnauthorizedException('Invalid credentials');
    }

    // Include 'username' in the JWT payload
    const payload = { id: user.id, email: user.email, username: user.name };
    const token = this.jwtService.sign(payload);

    return {
      status: true,
      message: 'Logged in successfully',
      token,
      username: user.name, // Send username with the response for convenience
    };
  }

  // Validate user based on JWT payload
  async validateUser(payload: any) {
    return this.userRepo.findOne({ where: { id: payload.id } });
  }
}
