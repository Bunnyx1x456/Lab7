const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Middleware для обробки POST-запитів з типом application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Статичні файли (HTML, CSS, JS) будуть віддаватися з папки public
app.use(express.static('public'));

// Обробка POST-запиту на /submit-survey
app.post('/submit-survey', (req, res) => {
    const formData = req.body;

    // Отримання локального часу з корекцією для файлової системи
    const timestamp = new Date();
    const localTimestamp = timestamp
        .toLocaleString('uk-UA', { timeZone: 'Europe/Kiev' })
        .replace(/[/:]/g, '-') // Заміна заборонених символів
        .replace(/,/g, ''); // Видалення ком

    // Формуємо дані для запису у файл
    const dataToSave = {
        timestamp: localTimestamp,
        name: formData.name,
        email: formData.email,
        question1: formData.question1,
        question2: formData.question2,
        question3: formData.question3
    };

    // Створюємо унікальне ім'я файлу
    const fileName = `survey_${localTimestamp}.json`;
    const filePath = path.join(__dirname, 'surveys', fileName);

    // Зберігаємо дані у файл
    fs.writeFile(filePath, JSON.stringify(dataToSave, null, 2), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Помилка при збереженні даних.');
        } else {
            res.send(`Дякуємо за ваш відгук! Дата та час заповнення: ${localTimestamp}`);
        }
    });
});

// Запускаємо сервер
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
