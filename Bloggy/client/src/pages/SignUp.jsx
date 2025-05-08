// shadcn packages
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
// react-router-dom packages
import { Link, useNavigate } from "react-router-dom";
// zod packages
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// custom packages
import { RouteSignIn } from "@/helpers/RouteName";
import { getEnv } from "../helpers/getEnv";
import { showToast } from "../helpers/showToast";

const SignUp = () => {
  const navigate = useNavigate();
  const formSchema = z.object({
    name: z
      .string()
      .nonempty({ message: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email().nonempty({ message: "Email is required" }),
    password: z.string().nonempty({ message: "Password is required" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Password is required" })
      .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
      }),
  });
  // hooks
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  // handlers
  const onSubmit = async (values) => {
    // console.log(import.meta.env.VITE_API_BASE_URL);
    try {
      const response = await fetch(
        `${getEnv("VITE_API_BASE_URL")}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        showToast("error", data.message);
      }
      navigate(RouteSignIn);
      showToast("success", data.message);
    } catch (error) {
      showToast("error", error.message);
    }
  };
  // return jsx
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Card className="w-[25rem] p-5">
        <h1 className="text-2xl font-bold text-center mb-5">
          Create an Account
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email address" {...field} />
                  </FormControl>
                  <FormMessage />
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
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password again"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
            <div className="flex gap-1 text-sm justify-center">
              <span>Already have an account?</span>
              <Link
                to={RouteSignIn}
                className="text-primary font-semibold hover:underline"
              >
                Sign In
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default SignUp;
