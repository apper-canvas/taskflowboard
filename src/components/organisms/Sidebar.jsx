import React from 'react'
import { motion } from 'framer-motion'
import CategoryItem from '@/components/molecules/CategoryItem'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'

const Sidebar = ({
  categories = [],
  taskCounts = {},
  loading = false,
  className = ''
}) => {
  return (
    <aside className={`w-72 bg-white border-r border-neutral-200 h-full overflow-y-auto ${className}`}>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-neutral-800 mb-2">Categories</h2>
          <p className="text-sm text-neutral-600">
            Organize your tasks by category
          </p>
        </div>

        {loading ? (
          <Loading variant="sidebar" />
        ) : (
          <nav className="space-y-1">
            {categories.map((category) => (
              <CategoryItem
                key={category.Id}
                category={category}
                count={taskCounts[category.Id] || 0}
              />
            ))}
          </nav>
        )}

        <div className="mt-12 p-4 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl border border-primary-100">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Zap" size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800">Stay Productive</h3>
            </div>
          </div>
          <p className="text-sm text-neutral-600 mb-4">
            Break down big goals into smaller, actionable tasks for better progress tracking.
          </p>
          <div className="flex items-center text-primary-600 text-sm font-medium">
            <ApperIcon name="TrendingUp" size={14} className="mr-2" />
            Productivity Tips
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar