import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl } from "../components/ui/form";
import { signInWithGoogle, logout } from "../lib/auth";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuthStore } from "../lib/authStore";
import type { User } from "firebase/auth";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const setGlobalUser = useAuthStore((state) => state.setUser);
  const globalUser = useAuthStore((state) => state.user);

  // Keep user state in sync with global store (for tab navigation)
  useEffect(() => {
    setUser(globalUser);
  }, [globalUser]);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: any) {
    try {
      if (isLogin) {
        const result = await signInWithEmailAndPassword(auth, data.email, data.password);
        setUser(result.user);
        setGlobalUser(result.user); // update global auth state
        // alert("Login successful!");
      } else {
        const result = await createUserWithEmailAndPassword(auth, data.email, data.password);
        setUser(result.user);
        setGlobalUser(result.user); // update global auth state
        // alert("Signup successful!");
      }
    } catch (error: any) {
      alert(error.message || "Authentication failed");
      console.error(error);
    }
  }

  async function handleGoogleLogin() {
    try {
      const user = await signInWithGoogle();
      setUser(user);
      setGlobalUser(user); // update global auth state
      // alert("Google login successful!");
    } catch (error: any) {
      alert(error.message || "Google authentication failed");
      console.error(error);
    }
  }

  async function handleLogout() {
    try {
      await logout();
      setUser(null);
      setGlobalUser(null); // clear global auth state
    } catch (error: any) {
      alert(error.message || "Logout failed");
      console.error(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[90vh] gap-20 mx-[2rem] ">
      <div className="w-full max-w-md max-sm:hidden hover:scale-105 transition-transform duration-300 ">
      
          <img src="https://res.cloudinary.com/dbzbqq0vw/image/upload/v1748512745/Login-rafiki_fkng4x.svg" alt="login image" />
      </div>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            {
              globalUser? "" : isLogin ? "Login" : "Sign Up"
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user ? (
            <>
              <div className="text-center mb-4">Welcome, {user.email || user.displayName}!</div>
              <Button onClick={handleLogout} className="w-full" type="button">Logout</Button>
            </>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Email" required autoComplete="email" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password" required autoComplete={isLogin ? "current-password" : "new-password"} {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full mt-2">
                  {isLogin ? "Login" : "Sign Up"}
                </Button>
              </form>
            </Form>
          )}
          {!user && (
            <>
              <div className="flex items-center my-4">
                <div className="flex-grow h-px bg-border" />
                <span className="mx-2 text-muted-foreground text-xs">OR</span>
                <div className="flex-grow h-px bg-border" />
              </div>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleGoogleLogin} type="button">
                <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_17_40)">
                    <path d="M47.532 24.552c0-1.636-.146-3.2-.418-4.704H24.48v9.08h13.008c-.56 3.016-2.24 5.576-4.768 7.288v6.04h7.712c4.52-4.164 7.1-10.292 7.1-17.704z" fill="#4285F4"/>
                    <path d="M24.48 48c6.48 0 11.92-2.148 15.888-5.84l-7.712-6.04c-2.148 1.44-4.9 2.304-8.176 2.304-6.28 0-11.6-4.24-13.504-9.944H2.56v6.24C6.52 43.36 14.68 48 24.48 48z" fill="#34A853"/>
                    <path d="M10.976 28.48A14.98 14.98 0 0 1 9.36 24c0-1.56.28-3.08.616-4.48v-6.24H2.56A23.98 23.98 0 0 0 0 24c0 3.92.94 7.64 2.56 10.72l8.416-6.24z" fill="#FBBC05"/>
                    <path d="M24.48 9.56c3.528 0 6.68 1.216 9.168 3.6l6.872-6.872C36.392 2.148 30.96 0 24.48 0 14.68 0 6.52 4.64 2.56 13.28l8.416 6.24c1.904-5.704 7.224-9.96 13.504-9.96z" fill="#EA4335"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_17_40">
                      <rect width="48" height="48" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
                Continue with Google
              </Button>
              <div className="mt-4 text-center text-sm">
                {isLogin ? (
                  <>
                    Don't have an account?{' '}
                    <button className="text-primary underline" onClick={() => setIsLogin(false)} type="button">
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button className="text-primary underline" onClick={() => setIsLogin(true)} type="button">
                      Login
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
