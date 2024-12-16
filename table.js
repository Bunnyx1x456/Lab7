$(document).ready(function() {
    let currentData = []; // Зберігаємо дані, щоб не завантажувати постійно
    let currentSort = null; // Зберігаємо тип сортування

    function fetchData(sortParam = null) {
        let url = 'http://lab.vntu.org/api-server/lab7.php';
        if (sortParam) {
            url += `?sort=${sortParam}`;
        }
         $('#dataTable tbody').empty(); // Очищаємо таблицю від старих даних
        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                currentData = data; // Зберігаємо отримані дані
                renderTable(data);
            },
            error: function(error) {
              console.error("Помилка завантаження даних:", error);
            }
        });
    }
    function renderTable(data) {
        let tableBody = $('#dataTable tbody');
        tableBody.empty();
          $.each(data, function(i, item) {
            tableBody.append(`
                <tr>
                    <td>${item.name}</td>
                    <td>${item.affiliation}</td>
                    <td>${item.rank}</td>
                </tr>
            `);
        });
    }

    $('#updateButton').click(function() {
         fetchData(currentSort); // Завантажуємо дані з поточним сортуванням
    });

    $('#sortByName').click(function() {
         currentSort = 'name'; // Встановлюємо поточне сортування
        fetchData('name');
    });

    $('#sortByAffiliation').click(function() {
         currentSort = 'affiliation'; // Встановлюємо поточне сортування
         fetchData('affiliation');
    });
     fetchData(); // Завантажуємо дані при завантаженні сторінки
});