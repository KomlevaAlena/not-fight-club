export function setingOpen() {
    const setingBtns = document.querySelectorAll('.seting__btn');
    const setingCloseBtns = document.querySelectorAll('.seting__form-btn');
    const seting = document.querySelector('.seting');

    setingBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            seting.classList.toggle('seting--active');
            document.body.classList.toggle('no-scroll');
        });
    });

    setingCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            seting.classList.remove('seting--active');
            document.body.classList.remove('no-scroll');
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && seting.classList.contains('seting--active')) {
            seting.classList.remove('seting--active');
            document.body.classList.remove('no-scroll');
        }
    });
}
