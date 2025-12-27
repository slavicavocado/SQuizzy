import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import MakingTest from './pages/MakingTest';
import UserPage from './pages/UserPage';

function HomePage() {
  const navigate = useNavigate();

  const goToMakingTest = () => {
    navigate('/making-test');
  };

   const goToUserPage = () => {
    navigate('/user');
  };

  return (
    <div className='bg-violet-200 min-h-screen flex flex-col items-center p-4 font-mono relative'>
      
      {/* кнопки Регистрации, Входа и Профиля в правом верхнем углу */}
      <div className="absolute top-4 right-4 flex gap-3">
        <button className="px-6 py-2 text-violet-700 font-medium border-2 border-violet-400 rounded-xl hover:bg-violet-50 hover:border-violet-500 transition-all duration-200">
          Регистрация
        </button>
        <button className="px-6 py-2 bg-violet-600 text-white font-medium border-2 border-violet-700 rounded-xl hover:bg-violet-700 transition-all duration-200 shadow-md">
          Вход
        </button>

        {/* кнопка перехода на страницу пользователя */}
          <button 
            onClick={goToUserPage}
          className="px-6 py-2 text-violet-700 font-medium border-2 border-violet-400 rounded-xl hover:bg-violet-50 hover:border-violet-500 transition-all duration-200 flex items-center gap-2"
          >
          Профиль
          </button>
        
      </div>

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
        <button 
          onClick={goToMakingTest}
          className='w-full py-6 bg-gradient-to-r from-purple-600 to-violet-700 text-white text-3xl font-bold border-2 border-violet-100 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-100'
        >
          СОЗДАТЬ ТЕСТ
        </button>
      </div>

      {/* сетка карточек */}
      {/* ЗДЕСЬ БУДЕТ НУЖЕН ЗАПРОС К API/БЭКУ */}
      <div className='w-full max-w flex-grow'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8'>
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className='bg-white border-2 border-violet-300 rounded-2xl p-6 flex flex-col items-center shadow-lg hover:shadow-2xl hover:border-violet-500 hover:scale-[1.03] transition-all duration-300 group cursor-pointer'
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/making-test" element={<MakingTest />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  );
}

export default App;