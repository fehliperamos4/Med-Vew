document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form.needs-validation');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        const name = document.getElementById('name').value;
        if (name) {
            localStorage.setItem('medvew_user_name', name);
        }
    });
});
