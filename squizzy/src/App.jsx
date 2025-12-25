import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)


  
  return (
    <>
    <div className='bg-violet-200 min-h-screen flex flex-col items-center p-4 font-mono'>
    {/* заголовок и описание */}
    <div className='text-center mb-12 mt-8'>
      <h1 className='text-6xl text-violet-950 transition-all duration-200 hover:scale-105 mb-4'>
        SQuizzy
      </h1>
      <p className='text-2xl text-violet-900 overline decoration-double'>
        платформа для создания и проведения тестов
      </p>
    </div>

    {/* кнопка создания теста */}
    <div className='w-full max-w-6xl mb-12'>
      <button className='w-full py-6 bg-gradient-to-r from-purple-600 to-violet-700 text-white text-3xl font-bold border-2 border-violet-100 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-100'>
        СОЗДАТЬ ТЕСТ
      </button>
    </div>

    {/* сетка карточек */} 
    {/* ЗДЕСЬ БУДЕТ НУЖЕН ЗАПРОС К API/БЭКУ */}
    <div className='w-full max-w-6xl flex-grow'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {Array.from({ length: 9 }).map((_, index) => (
          <a
            key={index}
            href='#'
            className='bg-white border-2 border-violet-300 rounded-2xl p-6 flex flex-col items-center shadow-lg hover:shadow-2xl hover:border-violet-500 hover:scale-[1.03] transition-all duration-300 group'
          >
            {/* картинка */}
            <div className='w-24 h-24 mb-4 bg-gradient-to-br from-purple-100 to-violet-200 rounded-xl flex items-center justify-center'>
              <span className='text-4xl text-violet-700'>
                {index + 1}
              </span>
            </div>
            
            {/* название теста */}
            <h3 className='text-xl font-bold text-violet-900 mb-2 text-center'>
              Название теста {index + 1}
            </h3>
            
            {/* описание */}
            <p className='text-gray-600 text-center text-sm flex-grow'>
              Краткое описание
            </p>
            
            {/* индикатор ссылки */}
            <div className='mt-4 text-violet-600 font-medium group-hover:text-violet-800 transition-colors'>
              Перейти →
            </div>
          </a>
        ))}
      </div>
    </div>
  </div>
    </>
  )
}

export default App
