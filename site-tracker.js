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
function tabSwitch() {
    //console.log("tab switch");
    if(currentDomain.name != " ") { // update previous domain time
        localStorage.setItem(currentDomain.name, currentDomain.time);
        let time = localStorage.getItem(currentDomain.name);
        console.log(time + " added to " + currentDomain.name);
    }
    const iID = setInterval(() => {
        browser.tabs.query({currentWindow: true, active: true}, ([currentTab]) => {
            const url = new URL(currentTab.url);
            const domainName = url.hostname;
            if(domainName == "") {
               clearInterval(iID); 
               return;
            } else if(domainName.substr(-4) != ".com"
                && domainName.substr(-4) != ".org"
                && domainName.substr(-4) != ".gov"
                && domainName.substr(-4) != ".edu") {
                console.log("domain ignored: " + domainName);
                clearInterval(iID); 
                return;
            }
            currentDomain.name = domainName;
            currentDomain.time = 5;
            urlCheck(domainName);  
            console.log("domain name = " + domainName);
            clearInterval(iID);
        })
    }, 5000);
    
}

//
async function urlCheck(domainName) {
    // console.log(domainName);
    // console.log(localStorage.getItem(domainName));
    if(localStorage.getItem(domainName) == undefined || localStorage.getItem(domainName) == 0) {
        console.log("new domain visited");
        localStorage.setItem(domainName, 5);
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