let btnscrap = document.getElementById("btnscrap");

btnscrap.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: scrapingProfile,
    });
  }
});

const scrapingProfile = async () => {
  const cssSelectorsProfile = {
    profile: {
      name: "div.pv-top-card__list-container > ul > li",
      resume: "div.pv-top-card__list-container > ul ~ h2",
      country: "div.pv-top-card__list-container > ul.mt1 > li.t-16",
      buttonSeeMore: "#ember58",
      email: "div > section.pv-contact-info_contact-type.ci-email > div > a",
      phone:
        "div > section.pv-contact-info_contact-type.ci-phone > ul > li > span",
      buttonCloseSeeMore: "button.artdeco-modal_dismiss",

      // about: '#ember1243 > span'
    },
  };

  //utils
  const wait = (milliseconds) => {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, milliseconds);
    });
  };

  const getContactProfile = async () => {
    const {
      profile: {
        buttonSeeeMore: buttonSeeMoreCss,
        name: nameCSS,
        resume: resumeCSS,
        country: countryCSS,
        email: emailCSS,
        phone: phoneCSS,
        buttonCloseSeeMore: buttonCloseSeeMoreCSS,

        about: aboutCSS,
      },
    } = cssSelectorsProfile;

    const name = document.querySelector(nameCSS)?.innerText;
    const resume = document.querySelector(resumeCSS)?.innerText;
    const country = document.querySelector(countryCSS)?.innerText;

    // "Contact info"
    // const buttonSeeMore = document.querySelector(buttonSeeMoreCss);
    // alert(buttonSeeMoreCss);
    // buttonSeeMore.click();
    // await wait(1000);

    const email = document.querySelector(emailCSS)?.innerText;
    const phone = document.querySelector(phoneCSS)?.innerText;

    // const about = document.querySelector(aboutCSS)?.innerText;
    // document.querySelector(buttonCloseSeeMoreCSS).click()

    return { name, resume, country };
  };
  const profile = await getContactProfile();
  console.log(profile);
};
