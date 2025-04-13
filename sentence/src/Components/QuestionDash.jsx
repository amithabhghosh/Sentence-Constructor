import React from 'react'
import { useNavigate } from 'react-router-dom'

export const QuestionDash = () => {
    const navigate=useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-xl w-full text-center">
     
      <div className="text-4xl mb-4">📝</div>

      <h1 className="text-2xl font-semibold text-gray-800">Sentence Construction</h1>

    
      <p className="text-gray-500 mt-2 text-sm">
        User have to contract a sentence a sentence with random words by placing it in a correct order.
      </p>

    
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-sm text-gray-700">
        <div>
          <div className="font-medium">Time Per Question</div>
          <div className="mt-1 text-gray-500">30 Seconds</div>
        </div>
        <div>
          <div className="font-medium">Total Questions</div>
          <div className="mt-1 text-gray-500">10</div>
        </div>
        <div>
          <div className="font-medium">Coins</div>
          <div className="mt-1 text-yellow-500 font-semibold">🟡 20 coins</div>
        </div>
      </div>

     
      <div className="mt-10 flex justify-center gap-4">
     
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition" onClick={()=>navigate("/question")}>
          Start
        </button>
      </div>
    </div>
  </div>
  )
}
