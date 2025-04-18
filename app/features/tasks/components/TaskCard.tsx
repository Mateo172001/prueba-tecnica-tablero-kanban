"use client";

import React from "react";
import { Task } from "../models/task";
import { useTasksContext } from "../hooks/TaskContext";
import { statusLabels } from "@/app/core/utils/statusLabels";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
}

const nextStatusMap: Record<Task["status"], Task["status"]> = {
  pending: "in-progress",
  "in-progress": "completed",
  completed: "pending",
};

export const TaskCard = ({ task, onEdit }: Props) => {
  const { updateTask } = useTasksContext();

  const handleStatusChange = () => {
    const updatedTask = {
      ...task,
      status: nextStatusMap[task.status],
    };
    updateTask(updatedTask);
  };

  return (
    <div
      className="bg-white rounded-md shadow p-4 mb-3 cursor-pointer"
      onClick={() => onEdit(task)}
    >
      <h3 className="font-semibold text-lg">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500">Asignado a: {task.user}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleStatusChange();
          }}
          className="text-xs text-blue-600 hover:underline"
        >
          Mover a: {statusLabels[nextStatusMap[task.status]]}
        </button>
      </div>
    </div>
  );
};
