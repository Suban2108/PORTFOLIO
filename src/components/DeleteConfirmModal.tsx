import { Dialog } from '@headlessui/react';
import React from 'react';

interface DeleteConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  description?: string;
  loading?: boolean;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  open,
  onConfirm,
  onCancel,
  title = 'Delete Item',
  description = 'Are you sure you want to delete this item? This action cannot be undone.',
  loading = false,
}) => (
  <Dialog open={open} onClose={onCancel} className="fixed z-50 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
      <Dialog.Panel className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 w-full max-w-md mx-auto z-10">
        <Dialog.Title className="text-lg font-bold mb-4 text-gray-900 dark:text-white">{title}</Dialog.Title>
        <p className="mb-6 text-gray-700 dark:text-gray-300">{description}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white font-semibold disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </Dialog.Panel>
    </div>
  </Dialog>
);

export default DeleteConfirmModal; 