"use client";

import { Task } from "@/types/Task";
import { useState } from "react";
import { taskService } from "@/services/taskService";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onUpdate: () => void;
}

export default function TaskItem({
  task,
  onEdit,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const [taskDetails, setTaskDetails] = useState<Task | null>(null);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDetailsClick = async () => {
    setDetailsLoading(true);
    setDetailsError(null);

    try {
      const details = await taskService.getTaskById(task.id);
      setTaskDetails(details);
      setShowDetailsModal(true);
    } catch (err) {
      setDetailsError("Failed to load task details");
      console.error(err);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCloseDetails = () => {
    setShowDetailsModal(false);
    setTaskDetails(null);
    setDetailsError(null);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await taskService.deleteTask(task.id);
      setShowDeleteModal(false);
      onDelete(task.id);
      onUpdate();
    } catch (err) {
      setError("Failed to delete task");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {task.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {task.description}
          </p>
          <p className="text-xs text-gray-500">
            Created: {formatDate(task.createdAt)}
          </p>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleDetailsClick}
            disabled={detailsLoading}
            className="px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white text-sm font-medium rounded-md transition-colors"
            title="View task"
          >
            {detailsLoading ? "Loading..." : "Details"}
          </button>
          <button
            onClick={() => onEdit(task)}
            className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors"
            title="Edit task"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteClick}
            disabled={isDeleting}
            className="px-3 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-sm font-medium rounded-md transition-colors"
            title="Delete task"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
      {error && (
        <div className="mt-3 p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded">
          {error}
        </div>
      )}

      {/* Task Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg min-w-80 mx-4 max-h-96 overflow-y-auto">
            {detailsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : detailsError ? (
              <div className="py-4">
                <p className="text-red-600 text-sm mb-4">{detailsError}</p>
                <button
                  onClick={handleCloseDetails}
                  className="w-full px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-md transition-colors"
                >
                  Close
                </button>
              </div>
            ) : taskDetails ? (
              <>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {taskDetails.name}
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">
                      Description
                    </h3>
                    <p className="text-gray-600 text-sm whitespace-pre-wrap">
                      {taskDetails.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Created: {formatDate(taskDetails.createdAt)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCloseDetails}
                  className="w-full mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors"
                >
                  Close
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-4">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Delete Task
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete &quot;<strong>{task.name}</strong>
              &quot;? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 font-medium rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-medium rounded-md transition-colors"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
