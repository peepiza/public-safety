document.addEventListener('DOMContentLoaded', function() {
    const userData = JSON.parse(localStorage.getItem('currentUser'));

    if (userData) {
        document.getElementById('userName').textContent = userData.name || 'Не указано';
        document.getElementById('userPhone').textContent = userData.phone || 'Не указано';
        
        if (userData.birthDate) {
            const date = new Date(userData.birthDate);
            document.getElementById('userBirth').textContent = date.toLocaleDateString('ru-RU');
        } else {
            document.getElementById('userBirth').textContent = 'Не указано';
        }
    } else {
        document.getElementById('userInfo').innerHTML = '<p style="text-align: center;">Вы не авторизованы</p>';
    }

    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        alert('Вы вышли из аккаунта');
        window.location.href = 'register.html';
    });
});