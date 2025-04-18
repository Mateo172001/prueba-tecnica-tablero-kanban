"use client";

import React, { useEffect, useState } from "react";
import { Task } from "../models/task";
import { useUsers } from "../hooks/useUsers";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  initialTask?: Task;
}

export const TaskModal = ({ isOpen, onClose, onSave, initialTask }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState("");
  const [status, setStatus] = useState<"pending" | "in-progress" | "completed">(
    "pending"
  );
  const { users, loading } = useUsers();

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setUser(initialTask.user);
      setStatus(initialTask.status);
    } else {
      setTitle("");
      setDescription("");
      setUser("");
      setStatus("pending");
    }
  }, [initialTask]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const task: Task = {
      id: initialTask?.id ?? Date.now(),
      title,
      description,
      user,
      status,
    };

    onSave(task);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-blue-500/25 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-md p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-semibold mb-4">
          {initialTask ? "Editar tarea" : "Crear nueva tarea"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <textarea
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          />
          <select
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="" disabled>
              {loading ? "Cargando usuarios..." : "Selecciona un usuario"}
            </option>
            {users.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as Task["status"])}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            <option value="pending">Pendiente</option>
            <option value="in-progress">Progreso</option>
            <option value="completed">Completado</option>
          </select>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {initialTask ? "Guardar cambios" : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
