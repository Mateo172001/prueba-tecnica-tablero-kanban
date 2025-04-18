export interface User {
    id: number;
    name: string;
  }
  
  export const getUsers = async (): Promise<User[]> => {
    const res = await fetch('http://localhost:3001/users');
    if (!res.ok) throw new Error('Error al cargar los usuarios');
    return res.json();
  };
  