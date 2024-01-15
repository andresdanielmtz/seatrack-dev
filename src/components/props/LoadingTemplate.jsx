import React from 'react'; 

const LoadingTemplate = () => {
    return ( 
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-md mt-10">
        {/* Loading skeleton structure */}
        <div className="animate-pulse">
          <div className="bg-gray-300 h-6 w-2/3 mb-4 rounded"></div>
          <div className="bg-gray-300 h-4 w-1/2 mb-2 rounded"></div>
          <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
          {/* Add more skeleton elements based on your design */}
        </div>
      </div>
    )
}

export default LoadingTemplate;