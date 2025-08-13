import { EntityManager } from '@mikro-orm/core';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserRole } from '../models/user/user.entity.js';
import { Student } from '../models/student/student.entity.js';

// Service for authentication logic
export class AuthService {
  private em: EntityManager;

  constructor(em: EntityManager) {
    this.em = em;
  }

  // Registers a new user and creates their student profile
  public async register(
    userData: Omit<User, 'password'> & { password_plaintext: string }
  ): Promise<User> {
    // Check if email is already used
    const existingUser = await this.em.findOne(User, { mail: userData.mail });
    if (existingUser) {
      throw new Error('Email already used');
    }
    // Hash the password before saving
    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(
      userData.password_plaintext,
      SALT_ROUNDS
    );

    // Create new user and student profile
    const newUser = this.em.create(User, {
      name: userData.name,
      surname: userData.surname,
      mail: userData.mail,
      password: hashedPassword,
      role: UserRole.STUDENT,
    });

    const newStudentProfile = this.em.create(Student, { user: newUser });
    newUser.studentProfile = newStudentProfile;

    // Save both user and profile
    await this.em.persistAndFlush([newUser, newStudentProfile]);

    // Remove password before returning user
    delete (newUser as Partial<User>).password;
    return newUser;
  }

  // Logs in a user and returns a JWT token
  public async login(credentials: {
    mail: string;
    password_plaintext: string;
  }): Promise<{ token: string }> {
    // Find user by email
    const user = await this.em.findOne(User, { mail: credentials.mail });

    if (!user) {
      throw new Error('Credenciales inválidas.');
    }

    // Check if password matches
    const isPasswordValid = await bcrypt.compare(
      credentials.password_plaintext,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas.');
    }

    // Create JWT token with user info
    const payload = { id: user.id, role: user.role };
    const JWT_SECRET = process.env.JWT_SECRET || 'DEFAULT_SECRET';
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

    return { token };
  }

  // Gets user profile by ID
  public async getProfile(userId: string): Promise<User | null> {
    const user = await this.em.findOne(User, { id: userId });

    if (!user) return null;

    // Remove password before returning user
    delete (user as Partial<User>).password;
    return user;
  }
}
