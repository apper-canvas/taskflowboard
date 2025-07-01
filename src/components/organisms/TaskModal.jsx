import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'

const TaskModal = ({
  isOpen,
  onClose,
  onSave,
  task = null,
  categories = []
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: '',
    dueDate: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'Medium',
        category: task.category || '',
        dueDate: task.dueDate ? task.dueDate.split('T')[0] : ''
      })
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'Medium',
        category: '',
        dueDate: ''
      })
    }
    setErrors({})
  }, [task, isOpen])

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      const taskData = {
        ...formData,
        completed: task?.completed || false,
        archived: task?.archived || false
      }
      
      if (task) {
        await onSave(task.Id, taskData)
      } else {
        await onSave(taskData)
      }
      
      onClose()
    } catch (error) {
      console.error('Error saving task:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const priorityOptions = [
    { value: 'High', label: 'High Priority' },
    { value: 'Medium', label: 'Medium Priority' },
    { value: 'Low', label: 'Low Priority' }
  ]

  const categoryOptions = categories.filter(cat => cat.Id !== 'all').map(cat => ({
    value: cat.name,
    label: cat.name
  }))

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 transition-opacity bg-neutral-500 bg-opacity-75 backdrop-blur-sm"
              onClick={onClose}
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-neutral-900">
                  {task ? 'Edit Task' : 'Create New Task'}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                >
                  <ApperIcon name="X" size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Task Title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter task title..."
                  error={errors.title}
                  required
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-neutral-700">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Add task description..."
                    rows={3}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 text-neutral-900 placeholder-neutral-400 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Priority"
                    value={formData.priority}
                    onChange={(e) => handleChange('priority', e.target.value)}
                    options={priorityOptions}
                    required
                  />

                  <Select
                    label="Category"
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    options={categoryOptions}
                    placeholder="Select category"
                    error={errors.category}
                    required
                  />
                </div>

                <Input
                  label="Due Date"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                />

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    loading={isSubmitting}
                    icon={task ? "Save" : "Plus"}
                  >
                    {task ? 'Save Changes' : 'Create Task'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default TaskModal