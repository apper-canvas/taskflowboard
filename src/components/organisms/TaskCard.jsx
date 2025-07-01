import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Checkbox from '@/components/atoms/Checkbox'
import Badge from '@/components/atoms/Badge'

const TaskCard = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  categories = [],
  className = ''
}) => {
  const [isCompleting, setIsCompleting] = useState(false)

  const handleToggleComplete = async () => {
    if (task.completed) {
      onToggleComplete(task.Id)
      return
    }

    setIsCompleting(true)
    
    // Add completion animation delay
    setTimeout(() => {
      onToggleComplete(task.Id)
      setIsCompleting(false)
    }, 500)
  }

  const getCategory = () => {
    return categories.find(cat => cat.name === task.category) || { color: '#5B4EF5', icon: 'Folder' }
  }

  const category = getCategory()
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isCompleting ? 0 : 1, 
          x: isCompleting ? 100 : 0,
          scale: isCompleting ? 0.95 : 1
        }}
        exit={{ opacity: 0, x: 100, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`bg-white rounded-xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-200 border border-neutral-100 ${
          task.completed ? 'opacity-75' : ''
        } ${className}`}
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 mt-1">
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
              size="md"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <h3 className={`font-semibold text-neutral-800 ${
                task.completed ? 'line-through text-neutral-500' : ''
              }`}>
                {task.title}
              </h3>
              
              <div className="flex items-center space-x-2 ml-4">
                <Badge
                  variant={task.priority.toLowerCase()}
                  pulse={task.priority === 'High' && !task.completed}
                  className="flex-shrink-0"
                >
                  {task.priority}
                </Badge>
                
                <div className="flex items-center space-x-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onEdit(task)}
                    className="p-1 text-neutral-400 hover:text-primary-600 transition-colors duration-200"
                  >
                    <ApperIcon name="Edit2" size={16} />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onDelete(task.Id)}
                    className="p-1 text-neutral-400 hover:text-accent-600 transition-colors duration-200"
                  >
                    <ApperIcon name="Trash2" size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
            
            {task.description && (
              <p className={`text-neutral-600 mb-4 ${
                task.completed ? 'line-through text-neutral-400' : ''
              }`}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-neutral-600">{task.category}</span>
                </div>
                
                {task.dueDate && (
                  <div className={`flex items-center space-x-1 text-sm ${
                    isOverdue ? 'text-accent-600' : 'text-neutral-600'
                  }`}>
                    <ApperIcon 
                      name={isOverdue ? 'AlertCircle' : 'Calendar'} 
                      size={14} 
                    />
                    <span>
                      {format(new Date(task.dueDate), 'MMM d, yyyy')}
                    </span>
                  </div>
                )}
              </div>
              
              {task.completed && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center text-success-600"
                >
                  <ApperIcon name="CheckCircle" size={16} className="mr-1" />
                  <span className="text-sm font-medium">Completed</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default TaskCard