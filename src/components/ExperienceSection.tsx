'use client';

import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, RefreshCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { experienceAPI } from '@/lib/api';
import { Dialog } from '@headlessui/react';
import DeleteConfirmModal from './DeleteConfirmModal';

interface ExperienceSectionProps {
  isAdmin?: boolean;
}

// Define Experience type
interface Experience {
  id: number;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  iconUrl?: string;
}

const ExperienceSection = ({ isAdmin = false }: ExperienceSectionProps) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editExp, setEditExp] = useState<Experience | null>(null);
  const [editValues, setEditValues] = useState<Partial<Experience>>({});
  const [saving, setSaving] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addValues, setAddValues] = useState<Omit<Experience, 'id'>>({
    company: '', title: '', location: '', startDate: '', endDate: '', description: '', iconUrl: ''
  });
  const [adding, setAdding] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const data = await experienceAPI.getAll();
      console.log('Fetched experiences:', data);
      setExperiences(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error('Failed to fetch experiences:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleDeleteExp = (id: number) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const confirmDeleteExp = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await experienceAPI.delete(deleteId);
    setDeleting(false);
    setShowDelete(false);
    setDeleteId(null);
    fetchExperiences();
  };

  const openEditExp = (exp: Experience) => {
    setEditExp(exp);
    setEditValues({ ...exp });
  };

  const saveEditExp = async () => {
    setSaving(true);
    await experienceAPI.update(editExp.id, { ...editValues });
    setEditExp(null);
    setEditValues({});
    setSaving(false);
    fetchExperiences();
  };

  const handleAddExperience = async () => {
    setAdding(true);
    await experienceAPI.create({ ...addValues });
    setAddModalOpen(false);
    setAddValues({ company: '', title: '', location: '', startDate: '', endDate: '', description: '', iconUrl: '' });
    setAdding(false);
    fetchExperiences();
  };

  const showLoader = loading && experiences.length === 0;

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Work</span>
            <span className="text-gray-900 dark:text-white"> Experience</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            My professional journey and the impact I've made along the way
          </p>
        </motion.div>

        {/* Loading Spinner if nothing is loaded yet */}
        {showLoader ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-blue-200 dark:border-blue-800"></div>
              <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Reload Button if data exists */}
            <div className="flex justify-end mb-4">
              <button
                onClick={fetchExperiences}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition"
              >
                <RefreshCcw size={16} className="animate-spin-reverse" />
                Reload
              </button>
            </div>

            {/* Experience Cards */}
            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {idx < experiences.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
                  )}
                  <div className="flex items-start space-x-6">
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {idx + 1}
                      </div>
                    </div>
                    <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 relative">
                      {exp.iconUrl && (
                        <img
                          src={exp.iconUrl}
                          alt={`${exp.company} logo`}
                          className="w-12 h-12 object-contain rounded-full absolute -top-6 -left-6 border-2 border-white shadow-md bg-white"
                        />
                      )}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {exp.title}
                          </h3>
                          <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-1">
                            {exp.company}
                          </p>
                          {exp.location && (
                            <p className="text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Location:</span> {exp.location}
                            </p>
                          )}
                          {(exp.startDate || exp.endDate) && (
                            <p className="text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">Period:</span> {exp.startDate} {exp.startDate && exp.endDate ? '–' : ''} {exp.endDate}
                            </p>
                          )}
                        </div>
                        {isAdmin && (
                          <div className="absolute top-3 right-3 flex items-center space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-2 rounded-lg shadow-lg transition"
                              onClick={() => openEditExp(exp)}
                            >
                              <Edit size={16} />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white p-2 rounded-lg shadow-lg transition"
                              onClick={() => handleDeleteExp(exp.id)}
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Admin Add Experience Button */}
        {isAdmin && (
          <div className="mb-6 flex justify-end mt-5">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              onClick={() => setAddModalOpen(true)}
            >
              <Plus size={18} /> Add New Experience
            </button>
          </div>
        )}
        {/* Edit Experience Modal */}
        <Dialog open={!!editExp} onClose={() => setEditExp(null)} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
            <Dialog.Panel className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 w-full max-w-lg mx-auto z-10">
              <Dialog.Title className="text-lg font-bold mb-4">Edit Experience</Dialog.Title>
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={editValues.company || ''}
                onChange={e => setEditValues((v) => ({ ...v, company: e.target.value }))}
                placeholder="Company"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={editValues.title || ''}
                onChange={e => setEditValues((v) => ({ ...v, title: e.target.value }))}
                placeholder="Title"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={editValues.location || ''}
                onChange={e => setEditValues((v) => ({ ...v, location: e.target.value }))}
                placeholder="Location"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={editValues.startDate || ''}
                onChange={e => setEditValues((v) => ({ ...v, startDate: e.target.value }))}
                placeholder="Start Date"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={editValues.endDate || ''}
                onChange={e => setEditValues((v) => ({ ...v, endDate: e.target.value }))}
                placeholder="End Date"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={editValues.iconUrl || ''}
                onChange={e => setEditValues((v) => ({ ...v, iconUrl: e.target.value }))}
                placeholder="Icon URL"
              />
              <textarea
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={editValues.description || ''}
                onChange={e => setEditValues((v) => ({ ...v, description: e.target.value }))}
                placeholder="Description"
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <button onClick={() => setEditExp(null)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">Cancel</button>
                <button onClick={saveEditExp} disabled={saving} className="px-4 py-2 rounded bg-blue-600 text-white font-semibold disabled:opacity-60">{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
        {/* Add Experience Modal */}
        <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
            <Dialog.Panel className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 w-full max-w-lg mx-auto z-10">
              <Dialog.Title className="text-lg font-bold mb-4">Add Experience</Dialog.Title>
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={addValues.company}
                onChange={e => setAddValues(v => ({ ...v, company: e.target.value }))}
                placeholder="e.g. Tech Solutions Inc."
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={addValues.title}
                onChange={e => setAddValues(v => ({ ...v, title: e.target.value }))}
                placeholder="e.g. Senior Full-Stack Developer"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={addValues.location}
                onChange={e => setAddValues(v => ({ ...v, location: e.target.value }))}
                placeholder="e.g. Remote or New York, NY"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={addValues.startDate}
                onChange={e => setAddValues(v => ({ ...v, startDate: e.target.value }))}
                placeholder="e.g. Jan 2022"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={addValues.endDate}
                onChange={e => setAddValues(v => ({ ...v, endDate: e.target.value }))}
                placeholder="e.g. Present or Dec 2023"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={addValues.iconUrl || ''}
                onChange={e => setAddValues(v => ({ ...v, iconUrl: e.target.value }))}
                placeholder="Icon URL (optional)"
              />
              <textarea
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={addValues.description}
                onChange={e => setAddValues(v => ({ ...v, description: e.target.value }))}
                placeholder="e.g. Led development of enterprise web applications using React, Node.js, and cloud technologies."
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <button onClick={() => setAddModalOpen(false)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">Cancel</button>
                <button onClick={handleAddExperience} disabled={adding} className="px-4 py-2 rounded bg-blue-600 text-white font-semibold disabled:opacity-60">{adding ? 'Adding...' : 'Add'}</button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
        <DeleteConfirmModal
          open={showDelete}
          onCancel={() => { setShowDelete(false); setDeleteId(null); }}
          onConfirm={confirmDeleteExp}
          loading={deleting}
          title="Delete Experience"
          description="Are you sure you want to delete this experience? This action cannot be undone."
        />
      </div>
    </section>
  );
};

export default ExperienceSection; 