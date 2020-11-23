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
    scrollIntoView(link);
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
    scrollIntoView('#contact');
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
    scrollIntoView('#home');
});


// 현재 뷰포트에 보여지는 섹션 navbar에서 활성화 하기
// 1. 모든 섹션 요소 가지고 오기
const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact',
];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id =>
    document.querySelector(`[data-link="${id}"]`)
);

// 2. intersectionObserver 이용하여 모든 섹션 관찰
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
};

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
    // console.log(selected)
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    // console.log(navItem);
    selectedNavItem.classList.add('active');
}

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        // 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);

            // 스크롤링 아래로
            if (entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            } else {
                selectedNavIndex = index - 1;
            }
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

// wheel은 scroll과 차이 있음
window.addEventListener('wheel', () => {
    // console.log(window.scrollY, window.innerHeight, document.body.clientHeight)
    // 맨 위랑 맨 아래는 예외처리 필요
    if (window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if (window.scrollY + window.innerHeight > document.body.clientHeight - 30) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});