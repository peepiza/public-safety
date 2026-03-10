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
    const emojis = ['🤡', '🙊', '🐷', '🦊', '🐰', '🐼'];

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
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; margin-bottom: 20px;">
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
        ">Отмена</button>
    `;
    
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    popup.querySelectorAll('.avatar-option').forEach(option => {
        option.addEventListener('mouseenter', () => {
            option.style.transform = 'scale(1.1)';
            option.style.borderColor = '#317530';
        });
        option.addEventListener('mouseleave', () => {
            option.style.transform = 'scale(1)';
            option.style.borderColor = '#45679a';
        });

        option.addEventListener('click', function() {
            const selectedEmoji = this.textContent;

            const avatar = document.querySelector('.avatar');
            if(avatar) {
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
        if(e.target === overlay) {
            document.body.removeChild(overlay);
        }
    })
}

function showNicknameEditPopup() {
    const UserData = JSON.parse(localStorage.getItem('currentUser')) || {};

    const overlay = document.createElement('div');
    overlay.style.cssText {
        
    }
}
