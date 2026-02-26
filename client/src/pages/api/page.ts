// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


export async function getTasks(){
  const res = await fetch('http://localhost:5000/tasks',{
    cache:'no-store'
  });
  if (!res.ok){
    throw new Error('Failed to fetch Tasks');
  }
  return res.json();
}
