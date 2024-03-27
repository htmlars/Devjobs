let darkMode = localStorage.getItem("darkMode");
const toggleSwitch = document.getElementById("toggle-switch");
const indicator = document.querySelector("#toggle-switch .indicator");

function updateSwitchPosition() {
    const isDarkMode = darkMode === "enabled";
    const newPosition = isDarkMode ? "1.5rem" : "0px";
    indicator.style.left = newPosition;
}

function toggleDarkMode() {
    if (darkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

function enableDarkMode() {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
    darkMode = "enabled";
    updateSwitchPosition();
}

function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
    darkMode = "disabled";
    updateSwitchPosition();
}

updateSwitchPosition();

toggleSwitch.addEventListener("click", toggleDarkMode);

window.addEventListener("DOMContentLoaded", () => {
    if (darkMode === "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

const filterCard = document.querySelector(".filter-card");

function toggleFilterCard() {
    if (filterCard.style.display === 'none' || filterCard.style.display === '') {
        filterCard.style.display = 'flex';
    } else {
        filterCard.style.display = 'none';
    }
}

document.getElementById("filter").addEventListener("click", function (event) {
    event.stopPropagation();
    toggleFilterCard();
});

document.addEventListener("click", function (event) {
    const isClickInsideFilterCard = filterCard.contains(event.target);
    const isFilterCardVisible = filterCard.classList.contains('show');

    if (!isClickInsideFilterCard && isFilterCardVisible) {
        toggleFilterCard();
    }
});

const loadMore = document.getElementById("load-more-btn");
let visibleCardCount = 9;
const cardsToLoad = 9;
let jobData = [];

async function fetchData() {
    try {
        console.log("fetched");
        const response = await fetch('./public/data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        jobData = await response.json();
        renderCards(jobData, 0, visibleCardCount);

        if (jobData.length > visibleCardCount) {
            loadMore.style.display = 'block';
        } else {
            loadMore.style.display = 'none';
        }
    } catch (error) {
        console.error('There was a problem fetching the data:', error);
    }
}

function renderCards(jobData, startIndex, count) {
    const jobList = document.querySelector('.grid-container');
    jobList.innerHTML = '';

    for (let i = startIndex; i < startIndex + count && i < jobData.length; i++) {
        const job = jobData[i];

        const jobCard = document.createElement('div');
        jobCard.classList.add('job-card');
        const imageContainer = document.createElement('div');
        imageContainer.style.backgroundColor = job.logoBackground;
        imageContainer.classList.add('imageContainer');
        const logo = document.createElement('img');
        logo.src = `./public/assets/logos/${job.company}.svg`;
        logo.alt = job.company;
        const content = document.createElement('div');
        content.classList.add('content');
        const info = document.createElement('div');
        info.classList.add('info');
        const ago = document.createElement('p');
        ago.textContent = job.postedAt;
        const dot = document.createElement('span');
        const contract = document.createElement('p');
        contract.textContent = job.contract;
        contract.classList.add("contract");
        const position = document.createElement('h1');
        position.textContent = job.position;
        const company = document.createElement('p');
        company.textContent = job.company;
        company.classList.add('company');
        const location = document.createElement('p');
        location.textContent = job.location;
        location.classList.add('location');

        imageContainer.appendChild(logo);
        info.appendChild(ago);
        info.appendChild(dot);
        info.appendChild(contract);
        content.appendChild(info);
        content.appendChild(position);
        content.appendChild(company);
        jobCard.appendChild(content);
        jobCard.appendChild(location);
        jobCard.appendChild(imageContainer);
        jobList.appendChild(jobCard);

        jobCard.addEventListener('click', () => renderDesc(job));
    }

    if (visibleCardCount < jobData.length) {
        loadMore.style.display = 'block';
    } else {
        loadMore.style.display = 'none';
    }
}

loadMore.addEventListener("click", function () {
    visibleCardCount += cardsToLoad;
    renderCards(jobData, 0, visibleCardCount);
});

const form = document.getElementById("main-form");
const filter = document.getElementById("filter-card");
const sec = document.getElementById("sec");
const compdiv = document.querySelector("article");
const applydiv = document.getElementById("apply");

const logoBtn = document.getElementById("logo-btn");
logoBtn.addEventListener("click", function () {
    form.style.display = window.innerWidth = 'flex';
    filter.style.display = 'none';
    sec.style.display = 'block';
    clearCompanyInfo();
});

function clearCompanyInfo() {
    compdiv.innerHTML = '';
    applydiv.innerHTML = '';
    compdiv.style.display = 'none';
    applydiv.style.display = 'none';
}

function renderDesc(job) {
    form.style.display = 'none';
    filter.style.display = 'none';
    sec.style.display = 'none';
    compdiv.style.display = 'block';
    applydiv.style.display = 'block';

    const companyInfo = document.querySelector("article");
    companyInfo.innerHTML = '';

    const topInfo = document.createElement('div');
    topInfo.classList.add('top-info');
    const logoContainer = document.createElement('div');
    logoContainer.style.backgroundColor = job.logoBackground;
    logoContainer.classList.add('logo-container');
    const compLogo = document.createElement('img');
    compLogo.src = `./public/assets/logos/${job.company}.svg`;
    compLogo.alt = job.company;
    const rightInfo = document.createElement('div');
    rightInfo.classList.add('right-info');
    const compInfo = document.createElement('div');
    compInfo.classList.add('comp-info');
    const compName = document.createElement('h2');
    compName.textContent = job.company;
    const compWeb = document.createElement('p');
    compWeb.textContent = (job.company + '.com').toLowerCase();
    const siteBtn = document.createElement('button');
    siteBtn.textContent = "Company Site";
    const webLink = document.createElement('a');
    webLink.href = job.website;

    companyInfo.appendChild(topInfo);
    topInfo.appendChild(logoContainer);
    topInfo.appendChild(rightInfo);
    rightInfo.appendChild(compInfo);
    rightInfo.appendChild(siteBtn);
    logoContainer.appendChild(compLogo);
    compInfo.appendChild(compName);
    compInfo.appendChild(compWeb);
    siteBtn.appendChild(webLink);

    const descWrapper = document.createElement('div');
    descWrapper.classList.add('desc-wrapper');
    const textHeader = document.createElement('div');
    textHeader.classList.add('text-header');
    const leftContent = document.createElement('div');
    leftContent.classList.add('content-left');
    const clock = document.createElement('div');
    clock.classList.add('clock');
    const postedAt = document.createElement('p');
    postedAt.classList.add('posted-at');
    postedAt.textContent = job.postedAt;
    const span = document.createElement('span');
    const contract = document.createElement('p');
    contract.textContent = job.contract;
    const positition = document.createElement('p');
    positition.classList.add('position');
    positition.textContent = job.position;
    const descLocation = document.createElement('p');
    descLocation.classList.add('desc-location');
    descLocation.textContent = job.location;
    const button = document.createElement('button');
    button.textContent = 'Apply Now';
    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = job.description;
    const requirements = document.createElement('h1');
    requirements.textContent = 'Requirements';
    const content = document.createElement('p');
    content.classList.add('content');
    content.textContent = job.requirements.content;
    const requirementItems = document.createElement('ul');
    const items = job.requirements.items.forEach(item => {
        const child = document.createElement('li');
        child.textContent = item;
        requirementItems.appendChild(child);
    });
    const whatYouWillDo = document.createElement('h1');
    whatYouWillDo.classList.add('what-you-will-do');
    whatYouWillDo.textContent = 'What You Will Do';
    const role = document.createElement('p');
    role.classList.add('role');
    role.textContent = job.role.content;
    const roleItems = document.createElement('ul');
    const rItems = job.role.items.forEach(item => {
        const child = document.createElement('li');
        child.textContent = item;
        roleItems.appendChild(child);
    });

    companyInfo.appendChild(descWrapper);
    descWrapper.appendChild(textHeader);
    textHeader.appendChild(leftContent);
    textHeader.appendChild(button);
    leftContent.appendChild(clock);
    clock.appendChild(postedAt);
    clock.appendChild(span);
    clock.appendChild(contract);
    leftContent.appendChild(positition);
    leftContent.appendChild(descLocation);
    descWrapper.appendChild(description);
    descWrapper.appendChild(requirements);
    descWrapper.appendChild(content);
    descWrapper.appendChild(requirementItems);
    descWrapper.appendChild(whatYouWillDo);
    descWrapper.appendChild(role);
    descWrapper.appendChild(roleItems);

    const apply = document.getElementById("apply");
    apply.innerHTML = '';
    const applyDiv = document.createElement('div');
    applyDiv.classList.add('apply-div');
    const applyFlex = document.createElement('div');
    applyFlex.classList.add('apply-flex');
    const jobPosition = document.createElement('h1');
    jobPosition.textContent = job.position;
    const companyName = document.createElement('p');
    companyName.textContent = job.company;
    const applyButton = document.createElement('button');
    applyButton.textContent = 'Apply Now';
    apply.appendChild(applyDiv);
    applyDiv.appendChild(applyFlex)
    applyDiv.appendChild(applyButton);
    applyFlex.appendChild(jobPosition);
    applyFlex.appendChild(companyName);
}

function filterJobs() {
    const titleFilter = document.getElementById("title-search").value.toLowerCase();
    const locationFilter = document.getElementById("location-search").value.toLowerCase();
    const timeFilter = document.getElementById("time-search").checked;
    const jobCards = document.querySelectorAll(".grid-container .job-card");
    const locationFilterCard = document.getElementById("location-filter").value.toLowerCase();
    const timeFilterCard = document.getElementById("time-filter").checked;

    let filteredJobCount = 0;
    let notFiltered = 0;

    jobCards.forEach(job => {
        const name = job.querySelector(".content .company").textContent.toLowerCase();
        const location = job.querySelector(".location").textContent.toLowerCase();
        const time = job.querySelector(".content .contract").textContent.toLowerCase() === "full time";

        if (
            (name.includes(titleFilter) || titleFilter === '') &&
            (location.includes(locationFilter) || locationFilter === '') &&
            (!timeFilter || (timeFilter && time)) &&
            (location.includes(locationFilterCard) || locationFilterCard === '') &&
            (!timeFilterCard || (timeFilterCard && time))
        ) {
            job.style.display = "block";
        } else {
            job.style.display = "none";
        }
    });

    if (notFiltered === 0) {
        loadMore.style.display = 'none';
    } else if (filteredJobCount >= 9) {
        loadMore.style.display = 'block';
    } else {
        loadMore.style.display = 'none';
    }
}

document.getElementById("search-btn").addEventListener("click", function () {
    filterJobs();
});
document.getElementById("mb-btn").addEventListener("click", function () {
    filterJobs();
});

document.getElementById("title-search").addEventListener("keydown", function (event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        filterJobs();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    fetchData();
});

filterJobs();