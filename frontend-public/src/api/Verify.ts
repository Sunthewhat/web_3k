export type IVerifyResponse = {
  userType: 'admin' | 'public';
};

export const Verify = async (): Promise<IVerifyResponse> => {
  const response: IVerifyResponse = {
    userType: 'admin',
  };
  return response;
};
