"use client";

import IconDiscord from "~/components/svgs/discord-svg";
import IconGithub from "~/components/svgs/github-svg";
import IconGoogle from "~/components/svgs/google-svg";
import { XCircle } from "lucide-react";

import { Button } from "~/components/ui/button";

import { signIn } from "next-auth/react";
import { toast } from "sonner";

export const SignInForm = () => {
  async function loginWithProvider(provider: "github" | "discord" | "google") {
    try {
      await signIn(provider, {
        callbackUrl: "/",
      });
    } catch {
      toast("Something error", {
        icon: <XCircle className="size-4" />,
      });
    }
  }

  return (
    <div className="w-96 rounded-md p-4 shadow-lg border-[1px]">
      <div className="text-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Welcome back!
        </h3>
        <p className="text-muted-foreground">
          Please choose a provider to sign in
        </p>
      </div>
      <div className="mt-6 flex justify-center gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={async () => {
            await loginWithProvider("discord");
          }}
        >
          <IconDiscord className="size-5 text-blue-500" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={async () => {
            await loginWithProvider("github");
          }}
        >
          <IconGithub className="size-5" />
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={async () => {
            await loginWithProvider("google");
          }}
        >
          <IconGoogle className="size-5" />
        </Button>
      </div>
    </div>
  );
};

// const [showPassword, setShowPassword] = useState(false);

// const form = useForm<z.infer<typeof SignInSchema>>({
//   resolver: zodResolver(SignInSchema),
//   defaultValues: {
//     email: "",
//     password: "",
//   },
// });

// async function onSubmit(data: z.infer<typeof SignInSchema>) {
//   console.log(data);
// }

// <Form {...form}>
//   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//     <FormField
//       control={form.control}
//       name="email"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>E-Mail Address</FormLabel>
//           <FormControl>
//             <Input placeholder="example@domain.com" {...field} />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//     <FormField
//       control={form.control}
//       name="password"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>Password</FormLabel>
//           <FormControl>
//             <div className="relative">
//               <Input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="my very secret password"
//                 {...field}
//               />
//               <Button
//                 size="icon"
//                 className="absolute right-2 top-0 text-muted-foreground hover:bg-transparent"
//                 variant="ghost"
//                 onClick={() => setShowPassword((prev) => !prev)}
//               >
//                 {showPassword ? (
//                   <EyeOff className="size-4" />
//                 ) : (
//                   <Eye className="size-4" />
//                 )}
//               </Button>
//             </div>
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//     <Button type="submit" className="w-full">
//       Sign in
//     </Button>
//   </form>
// </Form>
