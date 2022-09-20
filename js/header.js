const searchFormLabel = document.querySelector('.search-form__label');
const searchFormInput = document.querySelector('.search-form__input');
const searchFormSubmit = document.querySelector('.search-form__submit');
const searchFormToggle = document.querySelector('.main-nav-search-form-toggle');

function disableEmptyForm(input, submit) {
    if (input.value === "") {
        submit.style.pointerEvents = "none";
    } else {
        submit.style.pointerEvents = "auto";
    }
}

function toggleForOfLabelSearchForm(bool = true) {
    if (searchFormToggle.checked === bool) {
        searchFormLabel.removeAttribute('for');
    } else {
        searchFormLabel.setAttribute('for',"search-form__input");
    }
}

disableEmptyForm(searchFormInput, searchFormSubmit);

searchFormInput.addEventListener('input', e => {
    disableEmptyForm(e.target, searchFormSubmit);
} );

searchFormLabel.addEventListener('click', e => {
    searchFormToggle.checked = true;
});

searchFormInput.addEventListener('focusout', e => {
    if (e.target.value === '') {
        searchFormToggle.checked = false;
    }
    searchFormInput.blur();
});


const topMessage = document.querySelector('.message-container');
const mainHeader = document.querySelector('.main-header');
const body = document.querySelector('body');

document.addEventListener('scroll', e => {
    if (scrollY !== 0) {
        mainHeader.style.top = 0;
        // body.style.paddingTop = getComputedStyle(topMessage).height;
    } else {
        mainHeader.style.top = "";
        // body.style.padding = "";
    }

});

const mainNavList = document.querySelector('.main-nav__list');
const mainNavLinks = mainNavList.querySelectorAll('.main-nav__link');
console.log('🚀 ~ mainNavLinks', mainNavLinks);

function updateNavBar() {
    const possiblesLocations = ['index.html', 'alta.html', 'contacto.html', 'nosotros.html'];
    const HTMLCompleteLocation = window.location.href.split('/');
    const HTMLActualPage = HTMLCompleteLocation[HTMLCompleteLocation.length - 1];
    // console.log('🚀 ~ updateNavBar ~ HTMLActualPage', HTMLActualPage);
    const index = possiblesLocations.indexOf(HTMLActualPage)
    console.log('🚀 ~ updateNavBar ~ index', index);
    // if (index < 0) {
    //     window.location.href += "index.html";
    //     return;
    // }

    updateNavList(index);
}

function updateNavList(index) {
    for (let i = 0; i < mainNavLinks.length; i++) {
        // console.log('🚀 ~ updateNavList ~ mainNavLinks', mainNavLinks[i]);
        // console.log('', mainNavLinks[i].classList);
        
        if (i === index) {
            mainNavLinks[i].classList.add('actual-page');
        } else {
            mainNavLinks[i].classList.remove('actual-page');
        }
    }
}

updateNavBar();