document.addEventListener('DOMContentLoaded', function () {
    const registerCard = document.querySelector('.card');

    if (!registerCard) { return; }

    const registerButton = registerCard.querySelector('#register-button');

    if (registerButton) {
        registerButton.addEventListener('click', function (event) {
            event.preventDefault();

            clearOldErrors();

            let isValid = true;

            const nameInput = document.getElementById('name-input');
            const nameValue = nameInput.value.trim();

            if (nameValue === "") {
                showError(nameInput, 'Введите никнейм');
                isValid = false;
            } else if (nameValue.split(' ').filter(word => word.length > 0).length < 2) {
                showError(nameInput, 'Введите имя и фамилию');
                isValid = false;
            }

            const numberInput = document.getElementById('number-input');
            const numberValue = numberInput.value.trim();

            if (!numberValue) {
                showError(numberInput, 'Введите номер телефона');
                isValid = false;
            } else {
                const digitsOnly = numberValue.replace(/\D/g, '');

                if (digitsOnly.length !== 11) {
                    showError(numberInput, 'Номер должен содержать 11 цифр');
                    isValid = false;
                } else if (!digitsOnly.startsWith('7') && !digitsOnly.startsWith('8')) {
                    showError(numberInput, 'Номер должен начинаться с 7 или 8');
                    isValid = false;
                }
            }

            const dateInput = document.getElementById('data-input');
            const dateValue = dateInput.value;

            if (!dateValue) {
                showError(dateInput, 'Выберите дату рождения');
                isValid = false;
            } else {
                const birthDate = new Date(dateValue);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                birthDate.setHours(0, 0, 0, 0);

                if (birthDate > today) {
                    showError(dateInput, 'Дата рождения не может быть в будущем');
                    isValid = false;
                } else {
                    let age = today.getFullYear() - birthDate.getFullYear();
                    const monthDiff = today.getMonth() - birthDate.getMonth();

                    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                        age--;
                    }
                }
            }


            const passwordInput = document.getElementById('password-input');
            const passwordValue = passwordInput.value.trim();

            if (passwordValue === "") {
                showError(passwordInput, 'Введите пароль');
                isValid = false;
            } else if (passwordValue.length < 6) {
                showError(passwordInput, 'Пароль должен быть минимум 6 символов');
                isValid = false;
            }


            const passwordConfirmInput = document.getElementById('sec-password-input');
            const passwordConfirmValue = passwordConfirmInput.value.trim();

            if (passwordValue !== passwordConfirmValue) {
                showError(passwordConfirmInput, 'Пароли не совпадают');
                isValid = false;
            }

            if (isValid) {
                const userData = {
                    name: nameValue,
                    phone: numberValue,
                    birthDate: dateValue,
                    password: passwordValue,
                    registeredAt: new Date().toISOString(),
                    avatar: '😼'
                };

                localStorage.setItem('currentUser', JSON.stringify(userData));

                saveUserToHistory(userData);

                const formData = {
                    name: nameValue,
                    phone: numberValue,
                    birthDate: dateValue,
                    password: passwordValue,
                };

                const event = new CustomEvent('formValid', { detail: formData });
                document.dispatchEvent(event);

                alert('Регистрация прошла успешно!');

                window.location.href = 'agreement.html';
            }
        });
    }
    function saveUserToHistory(userData) {
        let users = JSON.parse(localStorage.getItem('users')) || [];

        users.push({
            ...userData,
            id: Date.now()
        });

        localStorage.setItem('users', JSON.stringify(users));
    }

    function showError(input, message) {
        input.style.border = '2px solid #ff3860';


        const inputGroup = input.closest('.input-group');
        if (inputGroup) {

            const oldError = inputGroup.querySelector('.error-message');
            if (oldError) oldError.remove();

            if (message) {
                const errorMsg = document.createElement('small');
                errorMsg.classList.add('error-message');
                errorMsg.style.color = '#ff3860';
                errorMsg.style.fontSize = '12px';
                errorMsg.style.marginLeft = '15px';
                errorMsg.style.marginTop = '5px';
                errorMsg.style.display = 'block';
                errorMsg.textContent = message;
                inputGroup.appendChild(errorMsg);
            }
        }
    }

    function clearOldErrors() {
        document.querySelectorAll('.input-group input').forEach(input => {
            input.style.border = '';
        });
        document.querySelectorAll('.error-message').forEach(el => el.remove());
    }

});