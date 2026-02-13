"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import Link from "next/link";
import loginSchema from "@/schema/login.schema";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const schema = loginSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.error) {
        toast.error("Invalid email or password");
        return;
      }

      toast.success("Login successful");
      router.push("/");
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mx-5">
      <div className="max-w-md mx-auto my-16">
        <div className="bg-white border rounded-2xl shadow-md p-8 space-y-6 transition hover:shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-neutral-800">
              Welcome Back
            </h2>
            <p className="text-neutral-500 mt-1">
              Login to your account to continue
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 flex flex-col"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <Link
                        href="/forgetPassword"
                        className="text-sm text-accent hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
              </Button>
            </form>
          </Form>

          <p className="mt-4 text-center text-sm text-neutral-600">
            Don&apos;t have an Account?{" "}
            <Link
              href="/register"
              className="text-accent font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
