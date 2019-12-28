const closeButton = document.querySelector('#close-menu')
const mobileMenu = document.querySelector('.header-hidden-desktop')
const tooltip = document.querySelector('.section-container-tooltip')
const closeTooltip = document.querySelector('.section-container-tooltip-close-button')
const thumbsVote = document.querySelectorAll('.thumbs-vote')
const voteButtons = document.querySelectorAll('.vote-now')
const voteAgain = document.querySelectorAll('.vote-again')
const cardDescription = document.querySelectorAll('.card-description')
const resultsContainer = document.querySelectorAll('.cards-results')
const thumbsContainer = document.querySelectorAll('.card-vote-thumbs')
const thumbsUpBar = document.querySelectorAll('.header-thumb-container .thumbs-up')
const thumbsDownBar = document.querySelectorAll('.header-thumb-container .thumbs-down')

const lclStgClickVoteButtonCounter = localStorage.getItem('clickVoteButtonCounter')
const lclStgthumbUpVoteCounter = localStorage.getItem('thumbUpVoteCounter')
const lclStgthumbDownVoteCounter = localStorage.getItem('thumbDownVoteCounter')

let clickVoteButtonCounter = lclStgClickVoteButtonCounter ? JSON.parse(lclStgClickVoteButtonCounter) : new Array(voteButtons.length).fill(0)
let thumbUpVoteCounter = lclStgthumbUpVoteCounter ? JSON.parse(lclStgthumbUpVoteCounter) : new Array(thumbsContainer.length).fill(0)
let thumbDownVoteCounter = lclStgthumbDownVoteCounter ? JSON.parse(lclStgthumbDownVoteCounter) : new Array(thumbsContainer.length).fill(0)

closeTooltip.addEventListener('click', () => {
    tooltip.classList.add('hide')
})

closeButton.addEventListener('click', () => {
    closeButton.classList.toggle('open')
    mobileMenu.classList.toggle('open')
})

const removeBorder = currentTarget => {
    let nextSibling = currentTarget.nextSibling
    let previousSibling = currentTarget.previousSibling

    if(nextSibling && nextSibling.classList.contains('border')) {
        nextSibling.classList.remove('border')
    } else if(previousSibling && previousSibling.classList.contains('border')) {
        previousSibling.classList.remove('border')
    }
}

const enableVoteButton = event => {
    let currentTarget = event.currentTarget

    currentTarget.classList.add('border');
    currentTarget.parentNode.parentElement.childNodes[0].classList.remove('disabled')

    removeBorder(currentTarget);
}

const isEmptyBar = (vote, percentage) => {
    if(percentage === 0) {
        vote.style.display = 'none'
    } else {
        vote.style.display = 'flex'
        vote.querySelector('.results').textContent = `${percentage.toFixed(0)}%`
    }
}

const printResults = (index, voteUpPercentage, voteDownPercentage) => {
    const currentUpBar = thumbsUpBar[index + 1]
    const currentDownBar = thumbsDownBar[index + 1]

    isEmptyBar(currentUpBar, voteUpPercentage)
    isEmptyBar(currentDownBar, voteDownPercentage)

    currentUpBar.style.width = `${voteUpPercentage.toFixed(2)}%`
    currentDownBar.style.width = `${voteDownPercentage.toFixed(2)}%`
}

const calculateResults = index => {
    const voteUpPercentage = (thumbUpVoteCounter[index] / clickVoteButtonCounter[index]) * 100
    const voteDownPercentage = (thumbDownVoteCounter[index] / clickVoteButtonCounter[index]) * 100
    printResults(index, voteUpPercentage, voteDownPercentage)
}

const showVoteResults = (index) => {
    clickVoteButtonCounter[index] = clickVoteButtonCounter[index] + 1

    if(thumbsContainer[index].childNodes[0].classList.contains('border')) {
        thumbUpVoteCounter[index] = thumbUpVoteCounter[index] + 1
    } else {
        thumbDownVoteCounter[index] = thumbDownVoteCounter[index] + 1
    }

    localStorage.setItem('clickVoteButtonCounter', JSON.stringify(clickVoteButtonCounter))
    localStorage.setItem('thumbUpVoteCounter', JSON.stringify(thumbUpVoteCounter))
    localStorage.setItem('thumbDownVoteCounter', JSON.stringify(thumbDownVoteCounter))
    calculateResults(index)

}

const resumeVote = (index, event) => {
    voteAgain[index].classList.remove('hide')
    event.target.classList.add('hide')
    cardDescription[index].textContent = 'Thank you for voting!'
    resultsContainer[index].classList.toggle('hide')
    thumbsContainer[index].classList.toggle('hide')

    showVoteResults(index)
}

thumbsVote.forEach(thumbVote => (
    thumbVote.addEventListener('click', enableVoteButton)
))

voteButtons.forEach((voteButton, index) => {
    voteButton.addEventListener('click', resumeVote.bind(this, index))
})

voteAgain.forEach((voteAgainButton, index) => {
    voteAgainButton.addEventListener('click', function(event) {
        voteButtons[index].classList.remove('hide')
        voteButtons[index].classList.add('disabled')
        event.target.classList.add('hide')
        resultsContainer[index].classList.toggle('hide')
        thumbsContainer[index].classList.toggle('hide')
    })
})
