document.addEventListener('DOMContentLoaded', function () {
    const userName = localStorage.getItem('medvew_user_name');
    if (userName) {
        document.querySelectorAll('.user-name-display').forEach((el) => {
            if (el.tagName === 'INPUT') {
                el.value = userName;
            } else {
                el.innerText = userName;
            }
        });
    }
});
