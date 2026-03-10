document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('formValid', function(event) {
        const formData = event.detail;

        console.log('Имя (никнейм):', formData.name);
        console.log('Номер телефона:', formData.phone);
        console.log('Дата рождения:', formData.birthDate);
        console.log('Пароль:', formData.password);
    });
});