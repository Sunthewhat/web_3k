import { Axios } from '@/AxiosInstance';
import { AxiosError } from 'axios';

const Login = async (
  username: string,
  password: string
): Promise<
  | { isSuccess: true }
  | {
      isSuccess: false;
      error: `This username doesn't exist` | 'Password incorrect' | 'Internal server error';
    }
> => {
  try {
    // await Axios.post('/api/auth/login', {
    //   username,
    //   password,
    // });
    await Axios({
      method: 'post',
      url: '/api/auth/login',
      data: {
        username,
        password,
      },
      withCredentials: true,
    });
    return { isSuccess: true };
  } catch (err: any) {
    if (err instanceof AxiosError) {
      if (err.message === 'Network Error')
        return { isSuccess: false, error: 'Internal server error' };
      const cause: string = err.response!.data;
      if (cause === 'Password is wrong.') return { isSuccess: false, error: 'Password incorrect' };
      else if (cause === 'Username does not exist.')
        return { isSuccess: false, error: `This username doesn't exist` };
      else {
        console.error(err);
        return { isSuccess: false, error: 'Internal server error' };
      }
    } else {
      console.error(err);
      return { isSuccess: false, error: 'Internal server error' };
    }
  }
};

export default Login;
