document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.btn-primary');
    
    if (loginButton) {
        loginButton.addEventListener('click', function(event) {
            event.preventDefault(); 
            
            clearErrors();
            
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            
            let isValid = true;
            
            if (username === "") {
                showError(usernameInput, 'Введите никнейм');
                isValid = false;
            } else if (username.length < 3) {
                showError(usernameInput, 'Никнейм должен быть минимум 3 символа');
                isValid = false;
            } else if (username.length > 20) {
                showError(usernameInput, 'Никнейм не должен превышать 20 символов');
                isValid = false;
            } else if (!/^[a-zA-Z0-9а-яА-ЯёЁ]+$/.test(username)) {
                showError(usernameInput, 'Никнейм может содержать только буквы и цифры');
                isValid = false;
            }
            
            if (password === "") {
                showError(passwordInput, 'Введите пароль');
                isValid = false;
            } else if (password.length < 6) {
                showError(passwordInput, 'Пароль должен быть минимум 6 символов');
                isValid = false;
            } else if (password.length > 30) {
                showError(passwordInput, 'Пароль не должен превышать 30 символов');
                isValid = false;
            } else if (!/[A-Z]/.test(password)) {
                showError(passwordInput, 'Пароль должен содержать хотя бы одну заглавную букву');
                isValid = false;
            } else if (!/[a-z]/.test(password)) {
                showError(passwordInput, 'Пароль должен содержать хотя бы одну строчную букву');
                isValid = false;
            } else if (!/[0-9]/.test(password)) {
                showError(passwordInput, 'Пароль должен содержать хотя бы одну цифру');
                isValid = false;
            }
            
            if (isValid) {
                checkUserExists(username, password, usernameInput, passwordInput);
            }
        });
    }
    
    function checkUserExists(username, password, usernameInput, passwordInput) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        const foundUser = users.find(user => 
            user.name.toLowerCase() === username.toLowerCase() && 
            user.password === password
        );
        
        if (foundUser) {
            localStorage.setItem('currentUser', JSON.stringify(foundUser));
            showSuccessAndRedirect();
        } 
        else if (currentUser && 
                currentUser.name.toLowerCase() === username.toLowerCase() && 
                currentUser.password === password) {
            showSuccessAndRedirect();
        }
        else {
            showError(usernameInput, 'Пользователь с таким никнеймом не найден');
            showError(passwordInput, 'Неверный пароль');
            
            const inputGroup = passwordInput.closest('.input-group');
            const hint = document.createElement('small');
            hint.style.color = '#666';
            hint.style.fontSize = '12px';
            hint.style.marginLeft = '15px';
            hint.style.marginTop = '5px';
            hint.style.display = 'block';
            hint.innerHTML = 'Нет аккаунта? <a href="register.html" style="color: #45679a;">Зарегистрируйтесь</a>';
            inputGroup.appendChild(hint);
            
            setTimeout(() => {
                if (hint.parentNode) {
                    hint.remove();
                }
            }, 5000);
        }
    }
    
    function showSuccessAndRedirect() {
        alert('Вход выполнен успешно!');
        

        setTimeout(() => {
            window.location.href = 'settings.html';
        }, 500);
    }
    
    function showError(input, message) {
        input.style.border = '2px solid #ff3860';
        
        const inputGroup = input.closest('.input-group');
        if (inputGroup) {
            const oldError = inputGroup.querySelector('.error-message');
            if (oldError) oldError.remove();
            
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
    
    function clearErrors() {
        document.querySelectorAll('.input-group input').forEach(input => {
            input.style.border = '';
        });
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        document.querySelectorAll('.input-group small:not(.error-message)').forEach(el => el.remove());
    }
});

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const loginButton = document.querySelector('.btn-primary');
        if (loginButton) {
            loginButton.click();
        }
    }
});
