import Link from "next/link";
import TaskActions from "./TaskActions";
async function getOne(id:string){
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
        cache : 'no-store',
    });
    if (!res.ok){
        throw new Error("Failed to fetch");
    }
    return res.json();
}
export default async function TaskDetails({params,}:{params:Promise<{id:string}>;
}
){
    const {id} = await params;
    const task = await getOne(id);
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
            <tr key ={task._id} className='hover:bg-blue-100 cursor-pointer'>
              <td className="border p-2"><Link href={`/${task.id}`}>{task.title}</Link></td>
              <td className="border p-2"><Link href={`/${task.id}`}>{task.description}</Link></td>
              <td className="border p-2"><Link href={`/${task.id}`}>{task.completed ?"Yes" : "No"}</Link></td>
              <td className="border p-2"><Link href={`/${task.id}`}>{task.priority}</Link></td>
              <td className="border p-2"><Link href={`/${task.id}`}>{task.createdAt}</Link></td>
            </tr>
          </tbody>
      </table>
      <TaskActions task={task} /> 
      <button type="button"><Link href={"/"}>Home</Link></button>
      </main>

    )
}