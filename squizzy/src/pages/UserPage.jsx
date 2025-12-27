import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MakingTest.css';

function UserPage() {
  // пока просто пример того как будет все выглядеть и что будет на стр юзера
  const [userData, setUserData] = useState({
    name: 'Иван Иванов',
    login: 'ivan_ivanov',
    password: '********',
    avatar: 'https://i.pinimg.com/736x/66/2e/22/662e22ca1453eec654bd2d0b4e11d748.jpg',
    createdTests: [
      { id: 1, title: 'Тест по математике', questions: 15 },
      { id: 2, title: 'Насколько хорошо ты знаешь мемы 2025 года', questions: 20 },
      { id: 3, title: 'Тест по программированию', questions: 10 },
    ],
    completedTests: [
      { id: 4, title: 'Английский язык', score: '95%', date: '15-12-2025' },
      { id: 5, title: 'Насколько хорошо ты знаешь мемы 2025 года', score: '100%', date: '15-12-2025' },
      { id: 6, title: 'Математика', score: '50%', date: '15-12-2025' },
    ]
  });

  return (
    <div className='bg-violet-50 min-h-screen p-6 font-mono'>
      <div className='max-w-6xl mx-auto'>
        {/* кнопка возврата на главную */}
        <div className='mb-5'>
          <Link 
            to="/" 
            className='inline-flex items-center text-violet-700 hover:text-violet-900 font-medium'
          >
            <span className='mr-2'>←</span> На главную
          </Link>
        </div>

        {/* заголовок */}
        <h1 className='text-4xl text-violet-950 mb-6 text-center'>
          Профиль пользователя
        </h1>

        {/* основная информация о пользователе, можно будет позже еще справа что-нибудь добавить*/}
        <div className='bg-white rounded-2xl shadow-xl p-8 mb-6 border border-violet-200'>
          <div className='flex flex-col md:flex-row items-center md:items-start gap-8'>
            {/* аватар */}
            <div className='w-48 h-48 rounded-full overflow-hidden border-4 border-violet-300 shadow-lg'>
              <img 
                src={userData.avatar} 
                alt="Аватар" 
                className='w-full h-full object-cover'
              />
            </div>
            
            {/* информация */}
            <div className='flex-1'>
              <div className='space-y-6'>
                <div>
                  <label className='block text-sm text-violet-600 mb-1'>Имя</label>
                  <div className='text-2xl font-bold text-violet-900'>
                    {userData.name}
                  </div>
                </div>
                
                <div>
                  <label className='block text-sm text-violet-600 mb-1'>Логин</label>
                  <div className='text-xl text-violet-800 font-medium'>
                    @{userData.login}
                  </div>
                </div>
                
                {/* пока нинаю чд с паролем, потом добавим возможность поменять вероятно */}
                <div>
                  <label className='block text-sm text-violet-600 mb-1'>Пароль</label>
                  <div className='text-xl text-gray-700 font-mono'>
                    {userData.password}
                  </div>
                </div>
                
                <button className='px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors duration-200'>
                  Редактировать профиль
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* созданные тесты */}
        <div className='bg-white rounded-2xl shadow-xl p-8 mb-6 border border-violet-200'>
          <h2 className='text-2xl font-bold text-violet-900 mb-6 pb-3 border-b border-violet-100'>
            Созданные тесты ({userData.createdTests.length})
          </h2>
          
          {userData.createdTests.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {userData.createdTests.map(test => (
                <div 
                  key={test.id}
                  className='bg-violet-50 rounded-xl p-5 hover:bg-violet-100 transition-colors duration-200 border border-violet-200 flex flex-col h-full'
                >
                  <h3 className='text-lg font-bold text-violet-800 mb-3 flex-grow'>{test.title}</h3>
                  <div className='flex justify-between text-sm text-violet-600 mb-3'>
                    <span>Вопросов: {test.questions}</span>
                  </div>
                  <button className='w-full py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors mt-auto'>
                    Перейти к тесту
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-8 text-violet-600'>
              Вы еще не создали ни одного теста
            </div>
          )}
          
          <div className='mt-6 text-center'>
            <Link 
              to="/making-test"
              className='inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl hover:opacity-90 transition-opacity'
            >
              Создать новый тест
            </Link>
          </div>
        </div>

        {/* пройденные тесты */}
        <div className='bg-white rounded-2xl shadow-xl p-8 border border-violet-200'>
          <h2 className='text-2xl font-bold text-violet-900 mb-6 pb-3 border-b border-violet-100'>
            Пройденные тесты ({userData.completedTests.length})
          </h2>
          
          {userData.completedTests.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-violet-100'>
                    <th className='text-left py-3 px-4 text-violet-700'>Тест</th>
                    <th className='text-left py-3 px-4 text-violet-700'>Результат</th>
                    <th className='text-left py-3 px-4 text-violet-700'>Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.completedTests.map(test => (
                    <tr key={test.id} className='border-b border-violet-50 hover:bg-violet-50'>
                      <td className='py-4 px-4 font-medium text-violet-800'>{test.title}</td>
                      <td className='py-4 px-4'>
                        <span className='inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium'>
                          {test.score}
                        </span>
                      </td>
                      <td className='py-4 px-4 text-violet-600'>{test.date}</td>
                      <td className='py-4 px-4'>
                        <button className='px-4 py-2 text-sm bg-violet-100 text-violet-700 rounded-lg hover:bg-violet-200'>
                          Посмотреть результат
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='text-center py-8 text-violet-600'>
              Вы еще не прошли ни одного теста
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPage;