
browser.tabs.onActivated.addListener(tabSwitch);
let _gHandle;
let _gTime;
let _gDomain;

// get new domain name, call urlCheck
async function tabSwitch() {
    clearInterval(_gHandle);
    let siteMap = new Map();
    if(_gTime != undefined) {
        siteMap.set(domain, {time: _gTime});
        browser.storage.local.set({stored_sites: siteMap}); // update time
        console.log(domain + "  " + siteMap.get(domain));
    }
    //console.log("test");
    _gDomain = " "; // reset for new site
    _gTime = 0; 
    console.log("tab switch");
    let tab = await browser.tabs.query({currentWindow: true, active: true});
    let url = tab[0].url;
    //console.log(url);

    let domainName = url.substring(0, (url.indexOf(".com")+4));
    _gDomain = domainName;
    console.log(domainName);
    urlCheck(domainName);
}

// call checkStoredSettings for domain name info, increment time
async function urlCheck(domainName) {
    //console.log("urlCheck");
    _gTime = await checkStoredSettings(domainName);
    console.log(_gTime);
    _gHandle = setInterval(() => { 
        console.log(domainName + " @ " + _gTime);
        _gTime += 15; 
    }, 15000);
}



// if map contains domainName key, get domain time. else add domain to map w/ time of 0
async function checkStoredSettings(domainName) {
    //console.log("checkStoredSettings");
    let getItem = await browser.storage.local.get();
    let storedSites = getItem.stored_sites;
    //console.log("boop");
    if(storedSites == undefined) {
        console.log("new domain");
        storedSites = new Map();
        storedSites.set(domainName, {time: 0});
        console.log(storedSites);
        browser.storage.local.set({stored_sites: storedSites});
    }
    let time = 0;
    if(storedSites.has(domainName)) {
        console.log("increment time");
        time = storedSites.get(domainName);
    } else {
        console.log("add new domain");
        storedSites.set(domainName, {time: 0}); // add new domain to map
        browser.storage.local.set({stored_sites: storedSites});
    }
    return time;
}