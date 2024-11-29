'use server';

import prisma from './db';
import { auth } from '@clerk/nextjs';
import { JobType, CreateAndEditJobType, createAndEditJobSchema } from './types';
import { redirect } from 'next/navigation';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
// import { resolve } from 'path';


function authenticateAndRedireact():string{
  const { userId } = auth();
  if(!userId) redirect('/');
  return userId;
}

export async function createJobAction(values:CreateAndEditJobType)
:Promise<JobType | null> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const userId = authenticateAndRedireact()

  try {
    createAndEditJobSchema.parse(values)
    const job = await prisma.job.create({
      data: {
        ...values,
        clerkId: userId, // Adiciona o campo necessário
      },
    });
    
    return job;
  } catch (error) {
      console.log(error);
      return null;
  }
}


type getAllJobsActionTypes = {
  search?: string;
  jobStatus?: string;
  page?: number; 
  limit?: number;
}

export async function getAllJobsAction({
  search,
  jobStatus,
  page = 1,
  limit = 10,
}:getAllJobsActionTypes): Promise<{
  jobs: JobType[];
  count: number;
  page: number;
  totalPages: number;
}> {
  const userId = authenticateAndRedireact()
  try {

    let whereClause:Prisma.JobWhereInput = {
      clerkId:userId
    }

    if(search){
      whereClause = {
        ...whereClause,
        OR:[
          {
            position:{
            contains:search
          },
        },
          {
            company:{
              contains:search
            },
          }
        ]
      }
    }

    if(jobStatus && jobStatus !== 'all'){
      whereClause = {
        ...whereClause,
        status:jobStatus,
      }
    }

    const jobs:JobType[] = await prisma.job.findMany({
      where:whereClause,
      orderBy:{
        createdAt:'desc'
      },
    });
    return {jobs, count: 0, page: 1, totalPages: 0};
  } catch (error) {
      return {jobs: [], count: 0, page: 1, totalPages: 0};
  }
}