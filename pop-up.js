
openPopup();

function allStorage() {
    let archive = {},
        keys = Object.keys(localStorage),
        i = keys.length;
    while ( i-- ) {
        archive[ keys[i] ] = localStorage.getItem( keys[i] );
    }
    return archive;
}

// get domain info from local storage and send to html doc
function openPopup() {
    console.log("open popup");
    let domainObj = allStorage();
    //let degrees = [];
    let totalTime;
    let domains = [];
    let times = [];

    // domains
    let i = 0;
    Object.keys(domainObj).forEach(key => {
        domains[i] = key;
        if(domainObj[key] == undefined) {
            return;
        }
        times[i] = domainObj[key];
        totalTime =+ parseInt(times[i]);
        i++;
    })

    //console.log(totalTime);

    function addListItems() {
        console.log("adding list items...");
        let i = 0;
        let domainList = document.getElementById("domainList");   

        domains.forEach(domain => {
            if(i == 10) { return; }
            let li = document.createElement("li");
            let text;
            // hours
            if(times[i] > 3600) {
                let hour = parseInt(times[i]/3600);
                let minute = times[i] - (hour*3600);
                text = document.createTextNode(domain + "  " + hour + "h " + minute + "m");
            } else if(times[i] >= 60 && times[i] <= 3600) {
                let minute = parseInt(times[i]/60);
                text = document.createTextNode(domain + "  " + minute + "m");
            } else {
                text = document.createTextNode(domain + "  " + times[i] + "s");
            }
            li.appendChild(text);
            domainList.appendChild(li);
            console.log("added: " + domain + "    " + times[i] + " to the list");
            i++;
        })
    }
    addListItems();
}