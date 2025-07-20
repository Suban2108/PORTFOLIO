'use client';

import { motion } from 'framer-motion';
import { Edit, Trash2, Plus, Leaf, Hamburger, ArrowLeftRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { projectsAPI } from '@/lib/api';
import { Dialog } from '@headlessui/react';
import DeleteConfirmModal from './DeleteConfirmModal';
import React from 'react';


interface ProjectsSectionProps {
  isAdmin?: boolean;
}

const ProjectsSection = ({ isAdmin = false }: ProjectsSectionProps) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editProject, setEditProject] = useState<any | null>(null);
  const [editValues, setEditValues] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addValues, setAddValues] = useState({ title: '', description: '', image: '', technologies: '', link: '', github: '' });
  const [adding, setAdding] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const data = await projectsAPI.getAll();
      setProjects(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDeleteProject = (id: number) => {
    setDeleteId(id);
    setShowDelete(true);
  };
  const confirmDeleteProject = async () => {
    if (!deleteId) return;
    setDeleting(true);
    await projectsAPI.delete(deleteId);
    setDeleting(false);
    setShowDelete(false);
    setDeleteId(null);
    fetchProjects();
  };

  // Edit Project Modal
  const openEditProject = (project: any) => {
    setEditProject(project);
    setEditValues({
      title: project.title,
      description: project.description,
      image: project.image,
      technologies: project.technologies.join(', '),
      link: project.link,
      github: project.github,
    });
  };
  const saveEditProject = async () => {
    setSaving(true);
    await projectsAPI.update(editProject.id, {
      ...editProject,
      ...editValues,
      technologies: editValues.technologies.split(',').map((t: string) => t.trim()),
    });
    setEditProject(null);
    setEditValues({});
    setSaving(false);
    fetchProjects();
  };

  const handleAddProject = async () => {
    setAdding(true);
    await projectsAPI.create({
      title: addValues.title,
      description: addValues.description,
      image: addValues.image,
      technologies: addValues.technologies.split(',').map((t: string) => t.trim()),
      link: addValues.link,
      github: addValues.github,
    });
    setAddModalOpen(false);
    setAddValues({ title: '', description: '', image: '', technologies: '', link: '', github: '' });
    setAdding(false);
    fetchProjects();
  };

  const icons: Record<number, React.ReactElement> = {
    2: <Leaf />,
    3: <ArrowLeftRight />,
    4: <Hamburger />,
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-blue-200 dark:border-blue-800"></div>
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
      </div>
    </div>
  }

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Featured
            </span>
            <span className="text-gray-900 dark:text-white"> Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Some of my recent work that showcases my skills and creativity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-red-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Project Image */}
              <div className="relative h-52 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 border-b border-red-200 dark:border-gray-700">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-2">
                      {
                        (() => {
                          const icon = icons[(project as any).id];
                          if (icon && typeof icon.type === 'function') {
                            const iconElement = icon as React.ReactElement<any, any>;
                            const existingClass = iconElement.props.className || '';
                            return React.cloneElement(iconElement, { className: `${existingClass} mx-auto text-blue-500`.trim() });
                          } else if (icon) {
                            return icon;
                          } else {
                            return (
                              <>
                                <div className="text-4xl">🖼️</div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Project Image
                                </p>
                              </>
                            );
                          }
                        })()
                      }
                  </div>
                </div>

                {/* Admin Edit/Delete Buttons */}
                {isAdmin && (
                  <div className="absolute top-3 right-3 flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => openEditProject(project)}
                    >
                      <Edit size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Project Content */}
              <div className="p-6 flex flex-col">
                <div className=" flex flex-col justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links */}
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.link}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Live
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-center py-2 px-4 rounded-lg font-medium transition-all duration-300"
                  >
                    GitHub
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Admin Add Project Button */}
        {isAdmin && (
          <div className="mb-6 flex justify-end mt-5">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              onClick={() => setAddModalOpen(true)}
            >
              <Plus size={18} /> Add New Project
            </button>
          </div>
        )}
        {/* Edit Project Modal */}
        <Dialog open={!!editProject} onClose={() => setEditProject(null)} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
            <Dialog.Panel className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 w-full max-w-lg mx-auto z-10">
              <Dialog.Title className="text-lg font-bold mb-4">Edit Project</Dialog.Title>
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={editValues.title || ''}
                onChange={e => setEditValues((v: any) => ({ ...v, title: e.target.value }))}
                placeholder="Project Title"
              />
              <textarea
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={editValues.description || ''}
                onChange={e => setEditValues((v: any) => ({ ...v, description: e.target.value }))}
                placeholder="Description"
                rows={3}
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={editValues.image || ''}
                onChange={e => setEditValues((v: any) => ({ ...v, image: e.target.value }))}
                placeholder="Image URL"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={editValues.technologies || ''}
                onChange={e => setEditValues((v: any) => ({ ...v, technologies: e.target.value }))}
                placeholder="Technologies (comma separated)"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={editValues.link || ''}
                onChange={e => setEditValues((v: any) => ({ ...v, link: e.target.value }))}
                placeholder="Live Link"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={editValues.github || ''}
                onChange={e => setEditValues((v: any) => ({ ...v, github: e.target.value }))}
                placeholder="GitHub Link"
              />
              <div className="flex justify-end space-x-2">
                <button onClick={() => setEditProject(null)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">Cancel</button>
                <button onClick={saveEditProject} disabled={saving} className="px-4 py-2 rounded bg-blue-600 text-white font-semibold disabled:opacity-60">{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
        {/* Add Project Modal */}
        <Dialog open={addModalOpen} onClose={() => setAddModalOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
            <Dialog.Panel className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 w-full max-w-lg mx-auto z-10">
              <Dialog.Title className="text-lg font-bold mb-4">Add Project</Dialog.Title>
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={addValues.title}
                onChange={e => setAddValues(v => ({ ...v, title: e.target.value }))}
                placeholder="e.g. E-Commerce Platform"
              />
              <textarea
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={addValues.description}
                onChange={e => setAddValues(v => ({ ...v, description: e.target.value }))}
                placeholder="e.g. A full-stack e-commerce platform built with Next.js, featuring user authentication, payment processing, and admin dashboard."
                rows={3}
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={addValues.image}
                onChange={e => setAddValues(v => ({ ...v, image: e.target.value }))}
                placeholder="e.g. /project1.jpg or https://yourdomain.com/project1.jpg"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={addValues.technologies}
                onChange={e => setAddValues(v => ({ ...v, technologies: e.target.value }))}
                placeholder="e.g. Next.js, TypeScript, Stripe, PostgreSQL"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={addValues.link}
                onChange={e => setAddValues(v => ({ ...v, link: e.target.value }))}
                placeholder="e.g. https://yourproject.com"
              />
              <input
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={addValues.github}
                onChange={e => setAddValues(v => ({ ...v, github: e.target.value }))}
                placeholder="e.g. https://github.com/yourusername/yourproject"
              />
              <div className="flex justify-end space-x-2">
                <button onClick={() => setAddModalOpen(false)} className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">Cancel</button>
                <button onClick={handleAddProject} disabled={adding} className="px-4 py-2 rounded bg-blue-600 text-white font-semibold disabled:opacity-60">{adding ? 'Adding...' : 'Add'}</button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
        <DeleteConfirmModal
          open={showDelete}
          onCancel={() => { setShowDelete(false); setDeleteId(null); }}
          onConfirm={confirmDeleteProject}
          loading={deleting}
          title="Delete Project"
          description="Are you sure you want to delete this project? This action cannot be undone."
        />
      </div>
    </section>
  );
};

export default ProjectsSection;
