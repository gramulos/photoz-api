import AppError from './AppError';

export default class AuthError extends AppError {
  constructor(message) {
    super(message || 'Authentication failed', 401);
  }
}
