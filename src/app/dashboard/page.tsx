'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { TaskBoard } from '@/components/tasks/TaskBoard';
import { authStorage } from '@/utils/auth';
import { User } from '@/types/api.types';

function DashboardContent() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = authStorage.getUser();
    setUser(userData);
  }, []);

  const handleLogout = () => {
    authStorage.clear();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <div className="navbar bg-base-100 shadow-lg">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Task Manager</a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar placeholder"
            >
              <div className="bg-neutral text-neutral-content rounded-full w-10 p-1">
                <span className="text-xl">
                  {user?.email.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li className="menu-title">
                <span>{user?.email}</span>
              </li>
              <li className="menu-title">
                <span>Rol: {user?.roleId === 1 ? 'Admin' : 'Usuario'}</span>
              </li>
              <li>
                <a onClick={handleLogout} className="text-error">
                  Cerrar Sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Tablero de Tareas</h1>
          <p className="text-base-content/60">
            Gestiona tus tareas de manera eficiente
          </p>
        </div>

        <TaskBoard />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
