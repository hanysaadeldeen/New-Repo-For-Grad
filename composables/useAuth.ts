export const useAuth = () => {
  const config = useRuntimeConfig();

  // register
  const register = async (data: {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const Senderdata = {
      FirstName: data.firstName,
      LastName: data.lastName,
      UserName: data.userName,
      Email: data.email,
      PhoneNumber: "01098765432",
      Password: data.password,
    };
    try {
      const response = await $fetch(
        `${config.public.BaseApi}/account/register`,
        {
          method: "POST",
          body: Senderdata,
        },
      );
      return response;
    } catch (error: any) {
      if (error?.response?._data) {
        return error.response._data;
      }
      return error;
    }
  };

  // login
  const login = async (data: { email: string; password: string }) => {
    const Senderdata = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await $fetch(`${config.public.BaseApi}/account/login`, {
        method: "POST",
        body: Senderdata,
      });
      return response;
    } catch (error: any) {
      if (error?.response?._data) {
        return error.response._data;
      }
      return error;
    }
  };

  // forget password (send code )
  const sendCode = async (data: { email: string }) => {
    const Senderdata = {
      email: data.email,
    };
    try {
      const response = await $fetch(
        `${config.public.BaseApi}/forget-password`,
        {
          method: "POST",
          body: Senderdata,
        },
      );
      return response;
    } catch (error: any) {
      if (error?.response?._data) {
        return error.response._data;
      }
      return error;
    }
  };

  // verify code
  const verifyCodeSend = async (data: { code: number | null }) => {
    const Senderdata = {
      code: data.code,
    };
    try {
      const response = await $fetch(`${config.public.BaseApi}/verify`, {
        method: "POST",
        body: Senderdata,
      });
      return response;
    } catch (error: any) {
      if (error?.response?._data) {
        return error.response._data;
      }
      return error;
    }
  };

  // reset password
  const resetPassword = async (data: {
    password: string;
    password_confirmation: string;
  }) => {
    const Senderdata = {
      password: data.password,
    };

    try {
      const response = await $fetch(`${config.public.BaseApi}/reset-password`, {
        method: "POST",
        body: Senderdata,
      });
      return response;
    } catch (error: any) {
      if (error?.response?._data) {
        return error.response._data;
      }
      return error;
    }
  };

  return { register, login, sendCode, verifyCodeSend, resetPassword };
};
