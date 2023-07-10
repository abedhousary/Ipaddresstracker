let ipinput = document.querySelector(".ip-inp");
let searchbtn = document.querySelector(".search-btn");
let ip = document.querySelector("#ip");
let loc = document.querySelector("#location");
let timezone = document.querySelector("#timezone");
let isp = document.querySelector("#isp");
let mapsshwoer = document.querySelector(".map");

var map = L.map('map').setView([51.505, -0.09], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var blackLocation = L.icon({
    iconUrl: '/images/icon-location.svg',

    iconSize: [46, 56], // size of the icon
    shadowSize: [46, 56], // size of the shadow
    iconAnchor: [46, 56], // point of the icon which will correspond to marker's location
});
L.marker([51.5, -0.09], { icon: blackLocation }).addTo(map);





async function fetchIpInformation(ipAddress) {
    const url = `https://geo.ipify.org/api/v2/country?apiKey=at_LikDiEE6vGHX8KksNdwtdMDyr3Zbb&ipAddress=${ipAddress}`;
    const response = await fetch(url);
    const data = await response.json();
    let fetchresult = data;
    ip.innerHTML = fetchresult["ip"];
    loc.innerHTML = `${fetchresult["location"]["country"]} ${fetchresult["location"]["region"]}`;
    timezone.innerHTML = fetchresult["location"]["timezone"];
    isp.innerHTML = fetchresult["isp"];
}


async function fetchIplocation(ipAddress) {
    // https://geo.ipify.org/api/v2/country?apiKey=at_LikDiEE6vGHX8KksNdwtdMDyr3Zbb&ipAddress=${ipAddress}
    const url = `https://ipinfo.io/${ipAddress}?token=435389aeecd067`;
    const response = await fetch(url);
    const data = await response.json();
    let fetchresult = data;
    let alti = fetchresult["loc"];
    map.setView([+alti.split(",")[0], +alti.split(",")[1]], 13);
    L.marker([+alti.split(",")[0], +alti.split(",")[1]], { icon: blackLocation }).addTo(map);
}



searchbtn.onclick = () => {
    console.log(fetchIpInformation(ipinput.value));
    console.log(fetchIplocation(ipinput.value));
}
ipinput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        console.log(fetchIpInformation(ipinput.value));
        console.log(fetchIplocation(ipinput.value));
    }
});
