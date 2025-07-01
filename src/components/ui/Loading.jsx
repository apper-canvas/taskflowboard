import React from 'react'

const Loading = ({ variant = 'tasks' }) => {
  if (variant === 'tasks') {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-soft animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="w-5 h-5 bg-neutral-200 rounded"></div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-5 bg-neutral-200 rounded w-3/4"></div>
                  <div className="w-3 h-3 bg-neutral-200 rounded-full"></div>
                </div>
                <div className="h-4 bg-neutral-100 rounded w-1/2"></div>
                <div className="flex items-center space-x-2">
                  <div className="h-6 bg-neutral-100 rounded-full w-16"></div>
                  <div className="h-4 bg-neutral-100 rounded w-20"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (variant === 'sidebar') {
    return (
      <div className="space-y-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 animate-pulse">
            <div className="w-8 h-8 bg-neutral-200 rounded-lg"></div>
            <div className="flex-1">
              <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
            </div>
            <div className="w-6 h-4 bg-neutral-200 rounded-full"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
    </div>
  )
}

export default Loading