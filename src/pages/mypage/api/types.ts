export type UserProfile = {
  name: string;
  email: string;
  loginId: string;
  role: string;
  createdAt: string;
};

export type ApiEnvelope<T> = {
  success: boolean;
  code: number;
  errorCode: string;
  message: string;
  timestamp: string;
  data: T;
};
