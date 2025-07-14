import { Request, Response } from 'express';
import { UserService } from '../models/User';
import { UserProfileService } from '../models/UserProfile';

export class UserController {
  /**
   * Create a new user
   */
  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        res.status(400).json({
          success: false,
          message: 'Username, email, and password are required'
        });
        return;
      }

      const user = await UserService.createUser({
        username,
        email,
        password
      });

      // Remove password from response
      const { password: _, ...userResponse } = user;

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: { user: userResponse }
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Login user
   */
  static async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      console.log('🔍 Login attempt for email:', email);

      if (!email || !password) {
        console.log('❌ Missing email or password');
        res.status(400).json({
          success: false,
          message: 'Email and password are required'
        });
        return;
      }

      console.log('🔍 Looking for user with email:', email);
      const user = await UserService.findUserByEmail(email);
      if (!user) {
        console.log('❌ User not found for email:', email);
        res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
        return;
      }

      console.log('✅ User found:', user.id, user.email);
      console.log('🔍 Comparing passwords...');
      const isValidPassword = await UserService.comparePassword(password, user.password);
      console.log('🔍 Password valid:', isValidPassword);
      
      if (!isValidPassword) {
        console.log('❌ Invalid password for user:', email);
        res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
        return;
      }

      // Remove password from response
      const { password: _, ...userResponse } = user;

      console.log('✅ Login successful for user:', email);
      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: { user: userResponse }
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({
        success: false,
        message: 'Login failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Get user by ID
   */
  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const user = await UserService.findUserById(id);
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User not found'
        });
        return;
      }

      // Remove password from response
      const { password: _, ...userResponse } = user;

      res.status(200).json({
        success: true,
        data: userResponse
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  /**
   * Get user profile
   */
  static async getUserProfile(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const profile = await UserProfileService.findProfileByUserId(id);
      if (!profile) {
        res.status(404).json({
          success: false,
          message: 'User profile not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: profile
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user profile',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

export default UserController;
