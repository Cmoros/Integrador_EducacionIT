const cardFavoriteArray = document.querySelectorAll('.card__favorite');

cardFavoriteArray.forEach(cardFavorite => {
    cardFavorite.addEventListener('click', e => {
        cardFavorite.classList.toggle('card__favorite--selected');
    })
});