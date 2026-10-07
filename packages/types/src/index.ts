export * from './study';
export * from './finance';
export * from './intel';
export * from './life';

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  errors?: string[];
}
