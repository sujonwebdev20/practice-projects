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
import { Link } from "react-router-dom";
// zod packages
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// custom packages
import { RouteSignUp } from "@/helpers/RouteName";

const Signin = () => {
  const formSchema = z.object({
    email: z.string().email().nonempty({ message: "Email is required" }),
    password: z.string().nonempty({ message: "Password is required" }),
  });
  // hooks
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // handlers
  const onSubmit = (values) => {
    console.log(values);
  };
  // return jsx
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Card className="w-[25rem] p-5">
        <h1 className="text-2xl font-bold text-center mb-5">
          Sign In Into Account
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
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
                    <Input placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Sign In
            </Button>
            <div className="flex gap-1 text-sm justify-center">
              <span>Don&apos;t have an account?</span>
              <Link
                to={RouteSignUp}
                className="text-primary font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Signin;
