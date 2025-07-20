'use client';

import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, Zap, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { skillsAPI } from '@/lib/api';
import { Dialog } from '@headlessui/react';
import DeleteConfirmModal from './DeleteConfirmModal';

interface SkillsSectionProps {
  isAdmin?: boolean;
}

const gradientColors = [
  'from-blue-500 via-purple-500 to-pink-500',
  'from-emerald-500 via-teal-500 to-cyan-500',
  'from-orange-500 via-amber-500 to-yellow-500',
  'from-rose-500 via-pink-500 to-purple-500',
  'from-indigo-500 via-blue-500 to-teal-500',
  'from-purple-500 via-violet-500 to-pink-500'
];

const cardBackgrounds = [
  'from-blue-50/80 via-purple-50/80 to-pink-50/80 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20',
  'from-emerald-50/80 via-teal-50/80 to-cyan-50/80 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-cyan-900/20',
  'from-orange-50/80 via-amber-50/80 to-yellow-50/80 dark:from-orange-900/20 dark:via-amber-900/20 dark:to-yellow-900/20',
  'from-rose-50/80 via-pink-50/80 to-purple-50/80 dark:from-rose-900/20 dark:via-pink-900/20 dark:to-purple-900/20',
  'from-indigo-50/80 via-blue-50/80 to-teal-50/80 dark:from-indigo-900/20 dark:via-blue-900/20 dark:to-teal-900/20',
  'from-purple-50/80 via-violet-50/80 to-pink-50/80 dark:from-purple-900/20 dark:via-violet-900/20 dark:to-pink-900/20'
];

// Define Skill and SkillCategory types
interface Skill {
  id?: number;
  name: string;
  level: number;
}
interface SkillCategory {
  id: number;
  title: string;
  skills: Skill[];
}

const SkillsSection = ({ isAdmin = false }: SkillsSectionProps) => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editState, setEditState] = useState<{ category: SkillCategory | null; skill: Skill | null; value: string; level: number; skills?: Skill[]; categoryTitle?: string }>({ category: null, skill: null, value: '', level: 0 });
  const [modalState, setModalState] = useState({ add: false, saving: false, adding: false });
  const [addValues, setAddValues] = useState({ title: '', skills: '' });
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<number|null>(null);
  const [deleting, setDeleting] = useState(false);
  // Add state for skill delete modal
  const [showDeleteSkill, setShowDeleteSkill] = useState(false);
  const [deleteSkillIdx, setDeleteSkillIdx] = useState<number|null>(null);
  const [deletingSkill, setDeletingSkill] = useState(false);
  // Add state for deleting a skill from the card view
  const [deletingCardSkill, setDeletingCardSkill] = useState(false);
  const [deleteCardSkillInfo, setDeleteCardSkillInfo] = useState<{ categoryId: number, skillId: number } | null>(null);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const data = await skillsAPI.getAll();
      setSkillCategories(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleDelete = async (id: number, skillId?: number) => {
    if (!confirm(`Delete this ${skillId ? 'skill' : 'category'}?`)) return;
    if (skillId) {
      const category = skillCategories.find(c => c.id === id);
      if (!category) return;
      const updatedSkills = category.skills.filter((s: Skill) => s.id !== skillId);
      await skillsAPI.update(id, { skills: updatedSkills });
    } else {
      await skillsAPI.delete(id);
    }
    fetchSkills();
  };

  const saveEdit = async () => {
    const { category, skill, value, level } = editState;
    setModalState(prev => ({ ...prev, saving: true }));
    if (!category) return;
    if (skill) {
      const updatedSkills = category.skills.map((s: Skill) =>
        s.id === skill.id ? { ...s, name: value, level } : s
      );
      await skillsAPI.update(category.id, { skills: updatedSkills });
    } else {
      await skillsAPI.update(category.id, { title: value });
    }
    setEditState({ category: null, skill: null, value: '', level: 0 });
    setModalState(prev => ({ ...prev, saving: false }));
    fetchSkills();
  };

  const handleAddCategory = async () => {
    setModalState(prev => ({ ...prev, adding: true }));
    // If adding to an existing category, append; otherwise, create new
    const existingCategory = skillCategories.find(
      (cat: SkillCategory) => cat.title.trim().toLowerCase() === addValues.title.trim().toLowerCase()
    );
    const newSkills = addValues.skills
      .split(',')
      .map(s => ({ name: s.trim(), level: 80 }))
      .filter(s => s.name);
    if (existingCategory) {
      // Append to existing
      const updatedSkills = [...existingCategory.skills, ...newSkills];
      await skillsAPI.update(existingCategory.id, {
        title: existingCategory.title,
        skills: updatedSkills,
      });
    } else {
      // Create new category
      await skillsAPI.create({
        title: addValues.title,
        skills: newSkills,
      });
    }
    setAddValues({ title: '', skills: '' });
    setModalState({ ...modalState, add: false, adding: false });
    fetchSkills();
  };

  // New handlers for unified modal
  const updateSkillName = (index: number, value: string) => {
    setEditState((prev: typeof editState) => {
      const newSkills = [...(prev.skills ?? [])];
      newSkills[index].name = value;
      return { ...prev, skills: newSkills };
    });
  };

  const updateSkillLevel = (index: number, value: number) => {
    setEditState((prev: typeof editState) => {
      const newSkills = [...(prev.skills ?? [])];
      newSkills[index].level = value;
      return { ...prev, skills: newSkills };
    });
  };

  const deleteSkill = (index: number) => {
    setEditState((prev: typeof editState) => {
      const newSkills = (prev.skills ?? []).filter((_: Skill, i: number) => i !== index);
      return { ...prev, skills: newSkills };
    });
  };

  const addSkill = () => {
    setEditState((prev: typeof editState) => ({
      ...prev,
      skills: [...(prev.skills ?? []), { name: '', level: 80 }],
    }));
  };

  const saveEditCategory = async () => {
    setModalState(prev => ({ ...prev, saving: true }));
    if (!editState.category) return;
    await skillsAPI.update(editState.category.id, {
      title: editState.categoryTitle,
      skills: editState.skills,
    });
    setEditState({ category: null, skill: null, value: '', level: 0 });
    setModalState(prev => ({ ...prev, saving: false }));
    fetchSkills();
  };

  const closeEditModal = () => {
    setEditState({ category: null, skill: null, value: '', level: 0 });
  };

  const handleDeleteCategory = (id: number) => {
    setDeleteId(id);
    setShowDelete(true);
  };
  const confirmDeleteCategory = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await skillsAPI.delete(deleteId);
    setDeleting(false);
    setShowDelete(false);
    setDeleteId(null);
    fetchSkills();
  };

  // Update deleteSkill to use modal
  const requestDeleteSkill = (idx: number) => {
    setDeleteSkillIdx(idx);
    setShowDeleteSkill(true);
  };
  const confirmDeleteSkill = async () => {
    if (deleteSkillIdx === null || !editState.category) return;
    setDeletingSkill(true);
    const newSkills = (editState.skills ?? []).filter((_: Skill, i: number) => i !== deleteSkillIdx);
    await skillsAPI.update(editState.category.id, {
      title: editState.categoryTitle,
      skills: newSkills,
    });
    setEditState((prev: typeof editState) => ({
      ...prev,
      skills: newSkills,
    }));
    setDeletingSkill(false);
    setShowDeleteSkill(false);
    setDeleteSkillIdx(null);
    fetchSkills();
  };

  // Handler for deleting a skill from the card view
  const handleDeleteSkillFromCard = (categoryId: number, skillId: number) => {
    setDeleteCardSkillInfo({ categoryId, skillId });
  };
  const confirmDeleteSkillFromCard = async () => {
    if (!deleteCardSkillInfo) return;
    setDeletingCardSkill(true);
    const category = skillCategories.find((c: SkillCategory) => c.id === deleteCardSkillInfo.categoryId);
    if (!category) return;
    const updatedSkills = category.skills.filter((s: Skill) => s.id !== deleteCardSkillInfo.skillId);
    await skillsAPI.update(deleteCardSkillInfo.categoryId, { skills: updatedSkills });
    setDeletingCardSkill(false);
    setDeleteCardSkillInfo(null);
    fetchSkills();
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/50 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-purple-100/20 dark:from-blue-900/10 dark:to-purple-900/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          viewport={{ once: true }} 
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-6">
            <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Skills & Expertise</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
            Technical Arsenal
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Cutting-edge technologies and frameworks I leverage to craft exceptional digital experiences
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-4 border-blue-200 dark:border-blue-800"></div>
              <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {skillCategories.map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${cardBackgrounds[i % cardBackgrounds.length]} backdrop-blur-sm border border-white/20 dark:border-gray-700/30 shadow-xl shadow-black/5 dark:shadow-black/20`}
              >
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${gradientColors[i % gradientColors.length]} shadow-lg`}></div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                        {category.title}
                      </h3>
                    </div>
                    {isAdmin && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => setEditState({ category, skill: null, value: category.title, level: 0 })}
                          className="p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-sm"
                        >
                          <Edit size={16} className="text-blue-600 dark:text-blue-400" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-2 rounded-xl bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-sm"
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {category.skills.map((skill: Skill, skillIndex: number) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: (i * 0.1) + (skillIndex * 0.05) }}
                        whileHover={{ scale: 1.05 }}
                        className="group/skill relative"
                      >
                        <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r ${gradientColors[i % gradientColors.length]} shadow-lg shadow-black/10 text-white font-medium text-sm backdrop-blur-sm border border-white/20`}>
                          <Star className="w-3 h-3 opacity-80" />
                          <span className="relative z-10">{skill.name}</span>
                          {isAdmin && (
                            <div className="flex gap-1 ml-1">
                              <button
                                onClick={() => setEditState({ category, skill, value: skill.name, level: skill.level })}
                                className="p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                              >
                                <Edit size={12} />
                              </button>
                              {skill.id !== undefined && (
                                <button
                                  onClick={() => handleDeleteSkillFromCard(category.id, skill.id!)}
                                  className="p-1 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                                >
                                  <Trash2 size={12} />
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {isAdmin && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => setModalState(prev => ({ ...prev, add: true }))}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105"
            >
              <Plus size={20} />
              Add New Category
            </button>
          </motion.div>
        )}

        {/* Enhanced Edit Modal */}
        <Dialog 
          open={!!editState.category} 
          onClose={() => setEditState({ category: null, skill: null, value: '', level: 0 })} 
          className="fixed z-50 inset-0"
        >
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
            <Dialog.Panel className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-700">
              <Dialog.Title className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Edit Category & Skills
              </Dialog.Title>
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={editState.categoryTitle}
                onChange={e => setEditState((s: typeof editState) => ({ ...s, categoryTitle: e.target.value }))}
                placeholder="Category Title"
              />
              <div className="mb-4">
                <div className="font-semibold mb-2">Skills</div>
                {(editState.skills ?? []).map((skill: Skill, idx: number) => (
                  <div key={skill.id || idx} className="flex items-center gap-2 mb-2">
                    <input
                      className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={skill.name}
                      onChange={e => updateSkillName(idx, e.target.value)}
                      placeholder="Skill Name"
                    />
                    <input
                      type="number"
                      min={0}
                      max={100}
                      className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={skill.level}
                      onChange={e => updateSkillLevel(idx, Number(e.target.value))}
                      placeholder="Level"
                    />
                    <button
                      className="text-red-500 hover:text-red-700 px-2"
                      onClick={() => requestDeleteSkill(idx)}
                      type="button"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  className="mt-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={addSkill}
                  type="button"
                >
                  + Add Skill
                </button>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={closeEditModal} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">Cancel</button>
                <button onClick={saveEditCategory} disabled={modalState.saving} className="px-4 py-2 rounded bg-blue-600 text-white font-semibold disabled:opacity-60">{modalState.saving ? 'Saving...' : 'Save'}</button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Enhanced Add Modal */}
        <Dialog 
          open={modalState.add} 
          onClose={() => setModalState(prev => ({ ...prev, add: false }))} 
          className="fixed z-50 inset-0"
        >
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
            <Dialog.Panel className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-gray-200 dark:border-gray-700">
              <Dialog.Title className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Add New Skill Category
              </Dialog.Title>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category Name
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={addValues.title}
                    onChange={e => setAddValues((v: { title: string; skills: string }) => ({ ...v, title: e.target.value }))}
                    placeholder="e.g. Frontend Development"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Skills (comma-separated)
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    rows={3}
                    value={addValues.skills}
                    onChange={e => setAddValues((v: { title: string; skills: string }) => ({ ...v, skills: e.target.value }))}
                    placeholder="e.g. React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setModalState(prev => ({ ...prev, add: false }))}
                    className="px-6 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCategory}
                    disabled={modalState.adding}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all font-medium shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {modalState.adding ? 'Adding...' : 'Add Category'}
                  </button>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        <DeleteConfirmModal
          open={showDelete}
          onCancel={() => { setShowDelete(false); setDeleteId(null); }}
          onConfirm={confirmDeleteCategory}
          loading={deleting}
          title="Delete Skill Category"
          description="Are you sure you want to delete this skill category? This action cannot be undone."
        />
        {/* Add DeleteConfirmModal for skill delete */}
        <DeleteConfirmModal
          open={showDeleteSkill}
          onCancel={() => { setShowDeleteSkill(false); setDeleteSkillIdx(null); }}
          onConfirm={confirmDeleteSkill}
          loading={deletingSkill}
          title="Delete Skill"
          description="Are you sure you want to delete this skill? This action cannot be undone."
        />
        {/* Add DeleteConfirmModal for card skill delete */}
        <DeleteConfirmModal
          open={!!deleteCardSkillInfo}
          onCancel={() => setDeleteCardSkillInfo(null)}
          onConfirm={confirmDeleteSkillFromCard}
          loading={deletingCardSkill}
          title="Delete Skill"
          description="Are you sure you want to delete this skill? This action cannot be undone."
        />
      </div>
    </section>
  );
};

export default SkillsSection;