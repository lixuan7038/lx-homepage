const IP_API_LIST = [
    { url: 'https://api.myip.la/all.json', extractIP: (data) => data.ip, extractCode: (data) => data.country_code },
    { url: 'https://api.ip.sb/geoip', extractIP: (data) => data.ip, extractCode: (data) => data.country_code || data.country },
    { url: 'https://ipapi.co/json/', extractIP: (data) => data.ip, extractCode: (data) => data.country_code },
    { url: 'https://api.ipgeolocation.io/ipgeo?apiKey=32bcd4a6e4b548968e7afcd64393f6a1', extractIP: (data) => data.ip, extractCode: (data) => data.country_code },
    { url: 'https://geolocation-db.com/json/', extractIP: (data) => data.IPv4 || data.ip, extractCode: (data) => data.country_code },
    { url: 'https://api.ipify.org?format=json', extractIP: (data) => data.ip, extractCode: () => '' }
];

async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        throw error;
    }
}

async function getIPInfo() {
    for (const api of IP_API_LIST) {
        try {
            const data = await fetchWithTimeout(api.url);
            const ipAddress = api.extractIP(data);
            const countryCode = api.extractCode(data);
            return {
                ip: ipAddress || null,
                countryCode: countryCode || null
            };
        } catch (error) {
            continue;
        }
    }
    return { ip: null, countryCode: null };
}