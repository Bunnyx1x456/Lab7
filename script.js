// Функція для зміни фону при наведенні
function changeBackground(id, color) {
  document.getElementById(id).style.backgroundColor = color;
}

// Додаємо обробники подій для кожної послуги
document.getElementById("trench").addEventListener("mouseover", function() {
  changeBackground("trench", "#818aa3");
});
document.getElementById("trench").addEventListener("mouseout", function() {
  changeBackground("trench", "transparent");
});

document.getElementById("cleaning").addEventListener("mouseover", function() {
  changeBackground("cleaning", "#818aa3");
});
document.getElementById("cleaning").addEventListener("mouseout", function() {
  changeBackground("cleaning", "transparent");
});

document.getElementById("loading").addEventListener("mouseover", function() {
  changeBackground("loading", "#818aa3");
});
document.getElementById("loading").addEventListener("mouseout", function() {
  changeBackground("loading", "transparent");
});

document.getElementById("planning").addEventListener("mouseover", function() {
  changeBackground("planning", "#818aa3");
});
document.getElementById("planning").addEventListener("mouseout", function() {
  changeBackground("planning", "transparent");
});
// Функція для показу/приховування таблиці
function toggleTableVisibility() {
    const table = document.querySelector(".services table");
    if (table.style.display === "none") {
      table.style.display = "table";
    } else {
      table.style.display = "none";
    }
  }
  
  // Додаємо обробник події для кнопки
  document.getElementById("toggleTable").addEventListener("click", toggleTableVisibility);
  // Анімація для логотипу (обертання як монети)
let logo = document.querySelector(".logo");
let angle = 0;
let direction = 1;

setInterval(function() {
  angle += 2 * direction;
  if (angle > 90 || angle < -90) {
    direction *= -1;
  }
  logo.style.transform = `perspective(600px) rotateY(${angle}deg)`;
}, 40);


document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Запобігаємо стандартній відправці форми

    const form = event.target;
    const formData = new FormData(form);
    
    fetch('/submit-survey', {
        method: 'POST',
        body: new URLSearchParams(formData),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        alert(data);
        form.reset();
    })
    .catch(error => {
        console.error('Помилка відправки:', error);
        alert('Виникла помилка при відправленні форми. Перевірте консоль');
    });
});