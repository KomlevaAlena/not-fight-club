export function setingOpen() {
    const setingBtn = document.querySelector('.seting__btn');
    const setingCloseBtn = document.querySelector('.seting__form-btn');
    const seting = document.querySelector('.seting');

    setingBtn.onclick = function () {
        seting.classList.toggle('seting--active');
        document.body.classList.toggle('no-scroll');
    };

    setingCloseBtn.onclick = function () {
        seting.classList.remove('seting--active');
        document.body.classList.remove('no-scroll');
    };

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && seting.classList.contains('seting--active')) {
            seting.classList.remove('seting--active');
            document.body.classList.remove('no-scroll');
        }
    });
}