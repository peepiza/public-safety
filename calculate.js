document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('formValid', function(event) {
        const formData = event.detail;

        console.clear();
        console.log('Имя:', formData.name);
        console.log('Номер телефона:', formData.number);
        console.log('Дата рождения:', formData.data);
        console.log('Пароль:', formData.password);
    });
});