// 'use client'

// import * as z from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';

// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';

// import { Input } from '@/components/ui/input';

// // Atualize o esquema de validação para incluir "password"
// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: 'Username must be at least 2 characters.',
//   }),
//   password: z.string().min(6, {
//     message: 'Password must be at least 6 characters.',
//   }),
// });
 
// function CreateJobForm() {
//   // Atualize os valores padrão para incluir "password"
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: '',
//       password: '', // Valor inicial do campo "password"
//     },
//   });

//   // Manipulador de envio
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     console.log(values); // Logs "username" e "password"
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
//         {/* Campo de Username */}
//         <FormField
//           control={form.control}
//           name='username'
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Username</FormLabel>
//               <FormControl>
//                 <Input placeholder='shadcn' {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Campo de Password */}
//         <FormField
//           control={form.control}
//           name='password'
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <Input type='password' placeholder='Enter your password' {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type='submit'>Submit</Button>
//       </form>
//     </Form>
//   );
// }

// export default CreateJobForm;
 
// ############## The examplo above it's for more inputs! ##############


'use client'

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

// This is the validation of the form.
const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});
 
function CreateJobForm() {
  //1. Define you form. This "<z.infer<typeof formSchema>>" is just a typescript. Then it's possible to set the Values of the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  });

//2. Define a submit handler.
function onSubmit(values: z.infer<typeof formSchema>) {
// Do something with the form values.
// This will be type-safe and validated. 
console.log(values);
}

return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
}

export default CreateJobForm;


