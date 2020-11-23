'use strict';

// navbar 스크롤
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.offsetTop;

document.addEventListener('scroll', () => {
    if (window.pageYOffset > navbarHeight) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
});

// 메뉴 클릭시 해당 위치로 이동
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link == null) {
        return;
    }
    const scrollTo = document.querySelector(link);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
    navbarMenu.classList.remove('open');
});

// 토글 버튼 누르면 navbar 나타나게
const navbarToggle = document.querySelector('.navbar__toggle-btn');
navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
})

// contact me 버튼
const contactButton = document.querySelector('.home__contact');
contactButton.addEventListener('click', (event) => {
    const scrollTo = document.querySelector('#contact');
    scrollTo.scrollIntoView({ behavior: 'smooth' });
});

// 스크롤 내려가면서 점점 페이드아웃
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    home.style.opacity = 1 - window.scrollY / homeHeight
});

// work filtering
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
    // span 태그 클릭했을 때도 적용되도록
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if (filter == null) {
        return;
    }

    // active 구분
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode
    target.classList.add('selected');

    // 애니메이션 
    projectContainer.classList.add('anim-out');

    setTimeout(() => {
        projects.forEach((project) => {
            if (filter === '*' || filter === project.dataset.type) {
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);
});

// arrow up 나타나게
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
});

// arrow up 클릭 시 맨 위로
arrowUp.addEventListener('click', () => {
    const scrollTo = document.querySelector('#home');
    scrollTo.scrollIntoView({ behavior: 'smooth' })
});