
browser.tabs.onActivated.addListener(tabSwitch);
let handle;

// get new domain name, call urlCheck
async function tabSwitch() {
    clearInterval(handle);
    console.log("tab switch");
    let tab = await browser.tabs.query({currentWindow: true, active: true});
    let url = tab[0].url;
    //console.log(url);

    let domainName = url.substring(0, (url.indexOf(".com")+4));
    //console.log(domainName);
    urlCheck(domainName);
}

// call checkStoredSettings for domain name info, increment domainNameTime
async function urlCheck(domainName) {
    //let domainNameTime = checkStoredSettings(domainName);
    let domainNameTime = 0;
    handle = setInterval(() => { 
        console.log(domainName + " @ " + domainNameTime);
        domainNameTime += 15; 
        //browser.storage.local.set({domain_name_time: domainNameTime}); // update time
    }, 15000);
}

// if new domain name; add to storedSites array. else return domainNameTime
async function checkStoredSettings(domainName) {
    for(let i = 0; i < storedSites.length; i++) {

    }
}