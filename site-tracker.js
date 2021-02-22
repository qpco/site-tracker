function checkInstalled() {
    console.log("extension installed successfully!");
    if(!browser.tabs.onUpdated.hasListener(tabSwitch)) {
        console.log("listener created for tab switching");
        browser.tabs.onUpdated.addListener(tabSwitch);
    }
}

currentDomain = {
    name: " ",
    time: 0
}

// get new domain name, call urlCheck
async function tabSwitch() {
    //console.log("tab switch");
    if(currentDomain.name != " ") { // update previous domain time
        localStorage.setItem(currentDomain.name, currentDomain.time);
        let time = localStorage.getItem(currentDomain.name);
        console.log(time + " added to " + currentDomain.name);
    }
    setTimeout(() => {}, 5000);
    browser.tabs.query({currentWindow: true, active: true}, ([currentTab]) => {
        const url = new URL(currentTab.url);
        const domainName = url.hostname;
        currentDomain.name = domainName;
        currentDomain.time = 0;
        urlCheck(domainName);  
        console.log("domain name = " + domainName);
    })
}

//
async function urlCheck(domainName) {
    console.log(domainName);
    console.log(localStorage.getItem(domainName));
    if(localStorage.getItem(domainName) == undefined || localStorage.getItem(domainName) == 0) { // problem
        console.log("new domain visited");
        localStorage.setItem(domainName, 0);
    }
    currentDomain.time = localStorage.getItem(domainName);
    let leave = false;
    browser.tabs.onUpdated.addListener(() => {
        leave = true;
    });
    let iID = setInterval(() => {
        //console.log(domainName + " @ " + currentDomain.time);
        if(leave == true) {
            //console.log("leaving tab");
            clearInterval(iID);
        }
        currentDomain.time = parseInt(currentDomain.time) + 1;
    }, 1000);
}

browser.runtime.onInstalled.addListener(checkInstalled);