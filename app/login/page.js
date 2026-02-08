import React from 'react';
import Login from '@/components/login'

export const metadata = {
  title: "BlogiFy | Login",
  description: "Login",
};
const LoginRouter = () => {
  return(
    <div>
      <Login/>
    </div>
  )
}

export default LoginRouter;