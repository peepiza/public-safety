document.addEventListener('DOMContentLoaded', function () {
    loadUserData();
    setupEditButtons();
});

function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('currentUser'));

    if (userData) {
        const nicknameDisplay = document.getElementById('nicknameDisplay');

        if (nicknameDisplay) {
            nicknameDisplay.textContent = userData.name;
        }

        const avatar = document.querySelector('.avatar');
        if (avatar && userData.avatar) {
            avatar.textContent = userData.avatar;
        }
        console.log('Загружены данные пользователя:', userData);
    } else {
        console.log('Пользователь не авторизован');
    }
}

function setupEditButtons() {
    const avatarEdit = document.querySelector('.avatar-edit');
    if (avatarEdit) {
        avatarEdit.addEventListener('click', function () {
            showAvatarEditPopup();
        });
    }

    const nicknameEdit = document.querySelector('.nickname-edit');
    if (nicknameEdit) {
        nicknameEdit.addEventListener('click', function () {
            showNicknameEditPopup();
        });
    }
}

function showAvatarEditPopup() {
    const emojis = ['🤡', '🙊', '🐷', '🦊', '🐰', '🐼', '😼', '🐱', '🐶', '🦁'];

    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;
    
    const popup = document.createElement('div');
    popup.style.cssText = `
        background-color: white;
        padding: 30px;
        border-radius: 30px;
        border: 3px solid #45679a;
        max-width: 400px;
        width: 90%;
        text-align: center;
        animation: popupAppear 0.3s ease;
    `;

    popup.innerHTML = `
        <h2 style="margin-bottom: 20px; color: #000;">Выберите аватар</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 20px;">
            ${emojis.map(emoji => `
                <div class="avatar-option" style="
                    font-size: 40px;
                    cursor: pointer;
                    padding: 10px;
                    border: 2px solid #45679a;
                    border-radius: 50%;
                    transition: all 0.2s;
                    background-color: white;
                    text-align: center;
                ">${emoji}</div>
            `).join('')}
        </div>
        <button class="close-popup" style="
            padding: 10px 30px;
            background-color: #45679a;
            color: white;
            border: 2px solid #000;
            border-radius: 40px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        ">Отмена</button>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    const closeBtn = popup.querySelector('.close-popup');
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.backgroundColor = '#3f5981';
        closeBtn.style.transform = 'translateY(-1px)';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.backgroundColor = '#45679a';
        closeBtn.style.transform = 'translateY(0)';
    });

    popup.querySelectorAll('.avatar-option').forEach(option => {
        option.addEventListener('mouseenter', () => {
            option.style.transform = 'scale(1.1)';
            option.style.borderColor = '#317530';
            option.style.backgroundColor = '#f0f7f0';
        });
        option.addEventListener('mouseleave', () => {
            option.style.transform = 'scale(1)';
            option.style.borderColor = '#45679a';
            option.style.backgroundColor = 'white';
        });

        option.addEventListener('click', function () {
            const selectedEmoji = this.textContent;

            const avatar = document.querySelector('.avatar');
            if (avatar) {
                avatar.textContent = selectedEmoji;
            }

            const userData = JSON.parse(localStorage.getItem('currentUser')) || {};
            userData.avatar = selectedEmoji;
            localStorage.setItem('currentUser', JSON.stringify(userData));

            document.body.removeChild(overlay);
            showNotification('Аватар обновлен!');
        });
    });

    popup.querySelector('.close-popup').addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
}

function showNicknameEditPopup() {
    const userData = JSON.parse(localStorage.getItem('currentUser')) || {};

    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;

    const popup = document.createElement('div');
    popup.style.cssText = `
        background-color: white;
        padding: 30px;
        border-radius: 30px;
        border: 3px solid #45679a;
        max-width: 400px;
        width: 90%;
        text-align: center;
        animation: popupAppear 0.3s ease;
    `;
    
    popup.innerHTML = `
        <h2 style="margin-bottom: 20px; color: #000;">Изменить никнейм</h2>
        <input type="text" id="edit-nickname" value="${userData.name || ''}" style="
            width: 100%;
            padding: 15px;
            border: 3px solid #45679a;
            border-radius: 50px;
            font-size: 18px;
            margin-bottom: 20px;
            outline: none;
            transition: border-color 0.2s;
        " placeholder="Введите новый никнейм">
        <div style="display: flex; gap: 10px; justify-content: center;">
            <button class="save-nickname" style="
                padding: 10px 30px;
                background-color: #317530;
                color: white;
                border: 2px solid #000;
                border-radius: 40px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            ">Сохранить</button>
            <button class="close-popup" style="
                padding: 10px 30px;
                background-color: #45679a;
                color: white;
                border: 2px solid #000;
                border-radius: 40px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
            ">Отмена</button>
        </div>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    const saveBtn = popup.querySelector('.save-nickname');
    const closeBtn = popup.querySelector('.close-popup');
    
    saveBtn.addEventListener('mouseenter', () => {
        saveBtn.style.backgroundColor = '#256025';
        saveBtn.style.transform = 'translateY(-1px)';
    });
    saveBtn.addEventListener('mouseleave', () => {
        saveBtn.style.backgroundColor = '#317530';
        saveBtn.style.transform = 'translateY(0)';
    });
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.backgroundColor = '#3f5981';
        closeBtn.style.transform = 'translateY(-1px)';
    });
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.backgroundColor = '#45679a';
        closeBtn.style.transform = 'translateY(0)';
    });

    const input = document.getElementById('edit-nickname');
    input.focus();
    
    input.addEventListener('focus', () => {
        input.style.borderColor = '#317530';
    });
    input.addEventListener('blur', () => {
        input.style.borderColor = '#45679a';
    });

    popup.querySelector('.save-nickname').addEventListener('click', () => {
        const newNickname = document.getElementById('edit-nickname').value.trim();
        
        if (newNickname) {
            const nicknameDisplay = document.getElementById('nicknameDisplay');
            if (nicknameDisplay) {
                nicknameDisplay.textContent = newNickname;
            }
            
            const userData = JSON.parse(localStorage.getItem('currentUser')) || {};
            userData.name = newNickname;
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            document.body.removeChild(overlay);
            showNotification('Никнейм обновлен!');
        } else {
            input.style.borderColor = '#ff3860';
            setTimeout(() => {
                input.style.borderColor = '#45679a';
            }, 2000);
        }
    });

    popup.querySelector('.close-popup').addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            popup.querySelector('.save-nickname').click();
        }
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #317530;
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        border: 2px solid #000;
        font-size: 16px;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes popupAppear {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;

if (!document.querySelector('#dynamic-styles')) {
    style.id = 'dynamic-styles';
    document.head.appendChild(style);
}