import { EntityManager } from '@mikro-orm/core';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, UserRole } from '../models/user/user.entity.js';
import { Student } from '../models/student/student.entity.js';


export class AuthService {
  private em: EntityManager;

  constructor(em: EntityManager) {
    this.em = em;
  }

  public async register(
    userData: Omit<User, 'password'> & { password_plaintext: string }
  ): Promise<User> {
    
    // (1) Check if the user already exists
    const existingUser = await this.em.findOne(User, { mail: userData.mail }); 
    if (existingUser) {
      throw new Error('Email already used');
    }

    // (2) Hash the password using bcrypt
    const SALT_ROUNDS = 10;
    
    const hashedPassword = await bcrypt.hash(
      userData.password_plaintext,
      SALT_ROUNDS
    );

    // (3) Create a new user
    const newUser = this.em.create(User, {
      name: userData.name,
      surname: userData.surname,
      mail: userData.mail,
      password: hashedPassword,
      role: UserRole.STUDENT,
    });

    // (4) Create a new student profile
    const newStudentProfile = this.em.create(Student, { user: newUser })

    // Check if this is needed
    newUser.studentProfile = newStudentProfile;
    //newStudentProfile.user = newUser;
    
    // (5) Persist the new user and student profile
    await this.em.persistAndFlush([newUser, newStudentProfile])

    // (6) Return the new user without the password
    delete (newUser as Partial<User>).password; // Remove password from the response
    return newUser;
    }

  
  public async login(credentials: { mail: string; password_plaintext: string }): Promise<{ user: User; token: string }> {
    
    const user = await this.em.findOne(User, { mail: credentials.mail });
  
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(credentials.password_plaintext, user.password)
  
    if( !isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const payload = { id: user.id , role: user.role }; // Create a payload with user ID and role. Payload could change in the future.


    const token = jwt.sign(payload, process.env.JWT_SECRET || 'DEFAULT_SECRET', {
      expiresIn: '24h',
    })

    delete (user as Partial<User>).password; // Remove password from the response
    return { user, token };
  }
}
