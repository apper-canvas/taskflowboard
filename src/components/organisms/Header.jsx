import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import SearchBar from '@/components/molecules/SearchBar'
import ProgressRing from '@/components/molecules/ProgressRing'
import Button from '@/components/atoms/Button'

const Header = ({
  searchQuery,
  onSearchChange,
  onSearchClear,
  onAddTask,
  completionPercentage = 0,
  totalTasks = 0,
  completedTasks = 0
}) => {
  return (
    <header className="bg-white border-b border-neutral-200 px-6 py-4 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-soft">
              <ApperIcon name="CheckSquare" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                TaskFlow
              </h1>
              <p className="text-sm text-neutral-600">
                {totalTasks > 0 ? `${completedTasks} of ${totalTasks} tasks completed` : 'No tasks yet'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            onClear={onSearchClear}
            className="w-80 hidden md:block"
          />

          {totalTasks > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center space-x-3"
            >
              <ProgressRing 
                progress={completionPercentage} 
                size={48} 
                strokeWidth={4}
              />
              <div className="text-sm">
                <div className="font-semibold text-neutral-800">
                  {Math.round(completionPercentage)}% Complete
                </div>
                <div className="text-neutral-600">
                  Keep it up!
                </div>
              </div>
            </motion.div>
          )}

          <Button
            onClick={onAddTask}
            icon="Plus"
            className="shadow-soft hover:shadow-glow"
          >
            Add Task
          </Button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden mt-4">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          onClear={onSearchClear}
        />
      </div>
    </header>
  )
}

export default Header