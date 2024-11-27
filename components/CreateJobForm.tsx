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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  JobStatus,
  JobMode,
  createAndEditJobSchema,
  CreateAndEditJobType,
} from '@/utils/types';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import { CustomFormField, CustomFormSelect } from "./FormComponents";

function CreateJobForm() {
  const form = useForm<CreateAndEditJobType>({
    resolver:zodResolver(createAndEditJobSchema),
    defaultValues: {
      position: '',
      company: '',
      location: '',
      status: JobStatus.Pending,
      mode: JobMode.FullTime,
    }
  });

  function onSubmit(values:CreateAndEditJobType) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-muted p-8">
        <h2 className="capitalize font-semibold text-4xl mb-6">
          add job
        </h2>
         <div className="grid gap-4 md:grid=cols-2 lg:grid-cols-3 items-start ">
          {/* position */}
          <CustomFormField name="position" control={form.control} />
          {/* company */}
          <CustomFormField name="company" control={form.control} />
          {/* location */}
          <CustomFormField name="location" control={form.control} />

          {/* job status */}
          <CustomFormSelect name='status' control={form.control} labelText='job status' items={Object.values(JobStatus)} />
          {/* job mode */}
          <CustomFormSelect name='mode' control={form.control} labelText='job mode' items={Object.values(JobMode)} />

          <Button type='submit' className='self-end capitalize'>
            create job
          </Button>
         </div>
      </form>
    </Form>
  )
};

export default CreateJobForm;