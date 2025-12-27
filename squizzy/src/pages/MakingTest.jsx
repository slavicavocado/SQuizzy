import { useState } from 'react';
import './MakingTest.css';

const MakingTest = () => {
  // состояние для вопросов
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: '',
      points: 1,
      answers: [
        { id: 1, text: '', isCorrect: true },
        { id: 2, text: '', isCorrect: false }
      ]
    }
  ]);

  // состояние для изображения теста (обложки)
  const [testImg, setTestImg] = useState(null);
  const [imgPrev, setImgPrev] = useState(null);

  // состояние для основной информации теста
  const [testTitle, setTestTitle] = useState('');
  const [testDescription, setTestDescription] = useState('');

  // индекс текущего редактируемого вопроса
  const [currQuestionIdx, setCurrQuestionIdx] = useState(0);

  // обработчик изменения названия теста
  const TitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 115) {
      setTestTitle(value);
    }
  };

  // обработчик изменения описания теста
  const DescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setTestDescription(value);
    }
  };

  // обработчик загрузки изображения для теста
  const ImgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // проверяем размер файла (максимум 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Файл слишком большой. Максимальный размер: 5MB');
        return;
      }

      // проверяем тип файла
      if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите изображение');
        return;
      }

      setTestImg(file);
      // создаем предпросмотр
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgPrev(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // обработчик удаления изображения теста
  const RemoveImg = () => {
    setTestImg(null);
    setImgPrev(null);
  };

  // функция для добавления нового вопроса
  const addQuestion = () => {
    const newId = questions.length + 1;
    const newQuestion = {
      id: newId,
      text: '',
      points: 1,
      answers: [
        { id: 1, text: '', isCorrect: true },
        { id: 2, text: '', isCorrect: false }
      ]
    };

    setQuestions([...questions, newQuestion]);
    // переходим к новому вопросу
    setCurrQuestionIdx(questions.length);
  };

  // функция для удаления вопроса
  const delQuestion = (questionId, e) => {
    e.stopPropagation(); // предотвращаем всплытие события

    if (questions.length <= 1) {
      alert('В тесте должен быть хотя бы один вопрос');
      return;
    }

    const questionIdx = questions.findIndex(q => q.id === questionId);
    const updQuestions = questions.filter(q => q.id !== questionId);

    // перенумеровываем ID вопросов
    const renumQuestions = updQuestions.map((q, index) => ({
      ...q,
      id: index + 1
    }));

    setQuestions(renumQuestions);

    // обновляем текущий индекс
    if (currQuestionIdx === questionIdx) {
      // если удаляем текущий вопрос, переходим на предыдущий или первый
      setCurrQuestionIdx(Math.max(0, questionIdx - 1));
    } else if (currQuestionIdx > questionIdx) {
      // если удаляем вопрос перед текущим, уменьшаем индекс текущего вопроса
      setCurrQuestionIdx(currQuestionIdx - 1);
    }
  };

  // функция для добавления нового варианта ответа к текущему вопросу
  const addAnswer = () => {
    const currQuestion = questions[currQuestionIdx];
    const newAnswerId = currQuestion.answers.length + 1;
    const newAnswer = {
      id: newAnswerId,
      text: '',
      isCorrect: false
    };

    const updQuestions = questions.map((question, index) => {
      if (index === currQuestionIdx) {
        return {
          ...question,
          answers: [...question.answers, newAnswer]
        };
      }
      return question;
    });

    setQuestions(updQuestions);
  };

  // функция для удаления варианта ответа
  const delAnswer = (answerId) => {
    const currQuestion = questions[currQuestionIdx];

    // нельзя удалить, если останется меньше 2 вариантов
    if (currQuestion.answers.length <= 2) return;

    const updAnswers = currQuestion.answers
      .filter(answer => answer.id !== answerId)
      .map((answer, index) => ({
        ...answer,
        id: index + 1
      }));

    const updQuestions = questions.map((question, index) => {
      if (index === currQuestionIdx) {
        return {
          ...question,
          answers: updAnswers
        };
      }
      return question;
    });

    setQuestions(updQuestions);
  };

  // функция для переключения правильного ответа
  const setCorrectAnswer = (answerId) => {
    const updQuestions = questions.map((question, index) => {
      if (index === currQuestionIdx) {
        return {
          ...question,
          answers: question.answers.map(answer => ({
            ...answer,
            isCorrect: answer.id === answerId
          }))
        };
      }
      return question;
    });

    setQuestions(updQuestions);
  };

  // функция для обновления текста вопроса
  const updateQuestionText = (text) => {
    const updQuestions = questions.map((question, index) => {
      if (index === currQuestionIdx) {
        return {
          ...question,
          text
        };
      }
      return question;
    });

    setQuestions(updQuestions);
  };

  // функция для обновления текста ответа
  const updateAnswerText = (answerId, text) => {
    const updQuestions = questions.map((question, index) => {
      if (index === currQuestionIdx) {
        return {
          ...question,
          answers: question.answers.map(answer =>
            answer.id === answerId ? { ...answer, text } : answer
          )
        };
      }
      return question;
    });

    setQuestions(updQuestions);
  };

  // функция для обновления баллов за вопрос
  const updateQuestionPoints = (points) => {
    const updQuestions = questions.map((question, index) => {
      if (index === currQuestionIdx) {
        return {
          ...question,
          points: Math.max(1, parseInt(points) || 1)
        };
      }
      return question;
    });

    setQuestions(updQuestions);
  };

  // получаем текущий вопрос
  const currQuestion = questions[currQuestionIdx];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-violet-100 p-4 md:p-6 font-mono">
      <div className="max-w-7xl mx-auto">
        {/* шапка */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl text-violet-900 font-bold">Создание теста</h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="px-5 py-2.5 text-violet-700 font-bold border-2 border-violet-300 rounded-xl hover:bg-violet-400 hover:text-white hover:border-violet-500 transition-all duration-200">
              Отмена
            </button>
            <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-violet-700 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-200">
              Сохранить тест
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* левая колонка - основная информация */}
          <div className="lg:col-span-2 space-y-6">
            {/* блок основной информации */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-violet-900 mb-6">Основная информация</h2>

              <div className="space-y-6">
                {/* Загрузка обложки теста */}
                <div>
                  <label className="block text-lg font-semibold text-violet-800 mb-3">
                    Обложка теста
                    <span className="text-sm text-gray-500 font-normal ml-2">
                      (будет отображаться на главной странице)
                    </span>
                  </label>
                  
                  {imgPrev ? (
                    <div className="space-y-4">
                      <div className="relative">
                        <img 
                          src={imgPrev} 
                          alt="Предпросмотр обложки" 
                          className="w-full h-48 object-cover rounded-xl border-2 border-violet-200"
                        />
                        <button
                          onClick={RemoveImg}
                          className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-all duration-200"
                        >
                          Удалить
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Это изображение будет отображаться как обложка вашего теста на главной странице.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-violet-300 rounded-xl p-6 text-center hover:border-violet-500 hover:bg-violet-50 transition-all duration-200">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                          </div>
                          <div>
                            <p className="text-violet-700 font-medium">Загрузите обложку для теста</p>
                            <p className="text-gray-500 text-sm mt-1">Рекомендуемый размер: 400x300px, не более 5MB</p>
                          </div>
                          <label className="cursor-pointer">
                            <div className="px-5 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-all duration-200">
                              Выбрать изображение
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={ImgUpload}
                              className="hidden"
                            />
                          </label>
                          <p className="text-gray-400 text-xs">
                            Поддерживаемые форматы: JPG, PNG, GIF, WebP
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">
                        Если не загрузить изображение, будет использована стандартная обложка.
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-semibold text-violet-800 mb-2">
                      Название теста *
                    </label>
                    <input
                      type="text"
                      value={testTitle}
                      onChange={TitleChange}
                      placeholder="Введите название теста..."
                      className="w-full p-4 text-lg border-2 border-violet-200 rounded-xl focus:border-violet-500 focus:outline-none transition-all duration-200"
                      maxLength={115}
                    />
                    <div className={`text-right text-sm mt-1 ${testTitle.length >= 100 ? 'text-red-500' : 'text-gray-500'}`}>
                      {testTitle.length}/115 символов
                    </div>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-violet-800 mb-2">
                      Категория
                    </label>
                    <select className="w-full p-4 text-lg border-2 border-violet-200 rounded-xl focus:border-violet-500 focus:outline-none transition-all duration-200 bg-white">
                      <option value="Общий">Общий</option>
                      <option value="Математика">Математика</option>
                      <option value="История">История</option>
                      <option value="Развлечение">Развлечение</option>
                      <option value="Другое">Другое</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-violet-800 mb-2">
                    Описание теста
                  </label>
                  <textarea
                    value={testDescription}
                    onChange={DescriptionChange}
                    placeholder="Опишите ваш тест..."
                    className="w-full p-4 text-lg border-2 border-violet-200 rounded-xl focus:border-violet-500 focus:outline-none transition-all duration-200 h-32"
                    maxLength={200}
                  />
                  <div className={`text-right text-sm mt-1 ${testDescription.length >= 100 ? 'text-red-500' : 'text-gray-500'}`}>
                    {testDescription.length}/200 символов
                  </div>
                </div>
              </div>
            </div>

            {/* редактор текущего вопроса */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-violet-900">
                  Вопрос {currQuestionIdx + 1}
                </h2>
                <div className="flex items-center gap-3">
                  <span className="text-violet-700 font-medium">Баллов за вопрос:</span>
                  <input
                    type="number"
                    min="1"
                    value={currQuestion.points}
                    onChange={(e) => updateQuestionPoints(e.target.value)}
                    className="w-20 p-2 border-2 border-violet-200 rounded-lg text-center focus:border-violet-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-lg font-semibold text-violet-800 mb-3">
                  Текст вопроса *
                </label>
                <textarea
                  value={currQuestion.text}
                  onChange={(e) => updateQuestionText(e.target.value)}
                  placeholder="Введите текст вопроса..."
                  className="w-full p-4 text-lg border-2 border-violet-200 rounded-xl h-32 focus:border-violet-500 focus:outline-none transition-all duration-200"
                />
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-lg font-semibold text-violet-800">
                    Варианты ответов *
                  </label>
                  <button
                    onClick={addAnswer}
                    className="px-4 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 transition-all duration-200"
                  >
                    + Добавить вариант
                  </button>
                </div>

                <div className="space-y-4">
                  {currQuestion.answers.map((answer) => (
                    <div key={answer.id} className="relative">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => setCorrectAnswer(answer.id)}
                          className={`mt-3 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${answer.isCorrect
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                          {answer.isCorrect ? '✓ Верный' : 'Отметить верным'}
                        </button>
                        <div className="flex-1">
                          <input
                            type="text"
                            value={answer.text}
                            onChange={(e) => updateAnswerText(answer.id, e.target.value)}
                            placeholder={`Текст варианта ${answer.id}...`}
                            className={`w-full p-4 text-lg border-2 rounded-xl focus:outline-none transition-all duration-200 ${answer.isCorrect
                              ? 'border-green-500 bg-green-50'
                              : 'border-violet-200 focus:border-violet-500'
                              }`}
                          />
                        </div>
                        <button
                          onClick={() => delAnswer(answer.id)}
                          className="mt-3 px-4 py-2 text-red-600 border-2 border-red-300 rounded-lg hover:bg-red-50 transition-all duration-200"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <p className="text-gray-600">
                  <span className="text-red-500">*</span> Обязательные поля
                </p>
              </div>
            </div>
          </div>

          {/* правая колонка - панель управления */}
          <div className="space-y-6">
            {/* панель навигации по вопросам */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-violet-900">
                  Вопросы ({questions.length})
                </h2>
                <button
                  onClick={addQuestion}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-700 text-white font-medium rounded-xl hover:shadow-gray-400 hover:shadow-md transition-all duration-200"
                >
                  + Добавить вопрос
                </button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {questions.map((question, index) => (
                  <div
                    key={question.id}
                    onClick={() => setCurrQuestionIdx(index)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer relative group ${currQuestionIdx === index
                      ? 'bg-violet-100 border-violet-500'
                      : 'bg-violet-50 border-violet-200 hover:bg-violet-100'
                      }`}
                  >
                    {/* кнопка удаления вопроса (появляется при наведении) */}
                    {questions.length > 1 && (
                      <button
                        onClick={(e) => delQuestion(question.id, e)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 z-10 shadow-md"
                        title="Удалить вопрос"
                      >
                        ×
                      </button>
                    )}
                    
                    <div className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${currQuestionIdx === index
                        ? 'bg-violet-600 text-white'
                        : 'bg-violet-200 text-violet-800'
                        }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-medium text-violet-800 break-words line-clamp-2">
                            {question.text || `Вопрос ${index + 1}`}
                          </span>
                          <div className="flex-shrink-0 flex items-center gap-2">
                            <span className="text-sm text-violet-600 whitespace-nowrap">
                              {question.points} балл{question.points === 1 ? '' : (question.points > 1 && question.points < 5) ? 'а' : 'ов'}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          {question.answers.filter(a => a.isCorrect).length} верный ответ
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* предпросмотр обложки */}
            {imgPrev && (
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-violet-900 mb-4">Предпросмотр обложки</h2>
                <div className="space-y-4">
                  <div className="bg-violet-50 rounded-xl p-4">
                    <div className="text-center text-violet-700 font-medium mb-3">
                      Так будет выглядеть ваш тест на главной странице:
                    </div>
                    <div className="bg-white border-2 border-violet-200 rounded-xl p-4 flex flex-col items-center shadow-sm">
                      <div className="w-full h-32 mb-4 rounded-lg overflow-hidden">
                        <img 
                          src={imgPrev} 
                          alt="Предпросмотр обложки" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="font-bold text-violet-900 mb-1 line-clamp-1">{testTitle || "Название теста"}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{testDescription || "Краткое описание"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* информация о тесте */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-violet-900 mb-4">Содержание теста</h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-violet-50 rounded-lg">
                  <span className="text-violet-700 font-medium">Всего вопросов:</span>
                  <span className="text-2xl font-bold text-violet-900">{questions.length}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700 font-medium">Всего баллов:</span>
                  <span className="text-2xl font-bold text-green-900">
                    {questions.reduce((sum, question) => sum + question.points, 0)}
                  </span>
                </div>

              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <h3 className="font-bold text-violet-800 mb-2">Подсказки:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Обложка теста будет отображаться на главной странице</li>
                  <li>• Без обложки будет использоваться стандартное изображение</li>
                  <li>• В основной информации обязательно напишите название теста</li>
                  <li>• В описании теста напишите краткое описание (необязательно)</li>
                  <li>• Выберите категорию при необходимости</li>
                  <li>• Обязательно напишите текст вопроса</li>
                  <li>• Отметьте верный ответ кнопкой "Отметить верным"</li>
                  <li>• В тесте должно быть минимум 2 варианта ответа на вопрос</li>
                  <li>• Только один вариант ответа верный (это пока, возможны изменения)</li>
                  <li>• Над содержнанием теста есть кнопка "Добавить вопрос"</li>
                  <li>• Чтобы удалить вопрос, наведите на него и нажмите на красный крестик</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* кнопка сохранения теста */}
        <div className="w-full max-w-6xl mt-12 mb-8">
          <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-violet-700 text-white text-xl font-bold border-2 border-violet-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-100">
            Сохранить и опубликовать тест
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakingTest;