import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import { getTasks } from '@/pages/api/page';
import Link from 'next/link';
const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const tasks = await getTasks();
  return (
    <main className='p-10'>
      <h1 className='text-3x1 font-bold'>Task Manager</h1>
      <table  border='10px'>
          <thead>
            <tr>
              <td>Title</td>
              <td>Description</td>
              <td>Completed</td>
              <td>Priority</td>
              <td>CreatedAt</td>
            </tr>
            </thead>
            <tbody>
          {tasks.map((task:any)=>(
            <tr key ={task._id} className='hover:bg-blue-100 cursor-pointer'>
              <td className="border p-2"><Link href={`/${task._id}`}>{task.title}</Link></td>
              <td className="border p-2"><Link href={`/${task._id}`}>{task.description}</Link></td>
              <td className="border p-2"><Link href={`/${task._id}`}>{task.completed ?"Yes" : "No"}</Link></td>
              <td className="border p-2"><Link href={`/${task._id}`}>{task.priority}</Link></td>
              <td className="border p-2"><Link href={`/${task._id}`}>{task.createdAt}</Link></td>
            </tr>
          ))}
          </tbody>
      </table>
      <button type='button'><Link href='/create'>Create Task</Link></button>
    </main> 
  )
}
