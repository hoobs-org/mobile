export function units(value) {
    const results = {
        value: Math.round((value / 1073741824) * 100) / 100,
        units: "GB",
    };

    while (results.value < 1 && results.units !== "KB") {
        results.value = Math.round((results.value * 1024) * 100) / 100;

        switch (results.units) {
            case "GB":
                results.units = "MB";
                break;

            case "MB":
                results.units = "KB";
                break;

            default:
                results.units = "GB";
                break;
        }
    }

    return results;
}

export function timespan(value) {
    const results = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    let timestamp = value;

    results.days = Math.floor(timestamp / (1000 * 60 * 60 * 24));
    timestamp -= results.days * (1000 * 60 * 60 * 24);
    results.hours = Math.floor(timestamp / (1000 * 60 * 60));
    timestamp -= results.hours * (1000 * 60 * 60);
    results.minutes = Math.floor(timestamp / (1000 * 60));
    timestamp -= results.minutes * (1000 * 60);
    results.seconds = Math.floor(timestamp / (1000));

    return results;
}

export function mac() {
    let value = "";

    for (let i = 0; i < 6; i += 1) {
        if (value !== "") value += ":";

        const hex = `00${Math.floor(Math.random() * 255).toString(16).toUpperCase()}`;

        value += hex.substring(hex.length - 2, hex.length);
    }

    return value;
}

export class ip {
    static expand(value) {
        if (value.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {  
            const parts = value.split(".");

            return (parts[0] * 16777216 + (parts[1] * 65536) + (parts[2] * 256) + (parts[3] * 1 ));
        }  
       
        return undefined;
    }

    static format(value) {
        if (!isNaN(value) && (value >= 0 || value <= 4294967295)) {
            return `${Math.floor(value / Math.pow(256, 3))}.${Math.floor((value % Math.pow(256, 3)) / Math.pow(256, 2))}.${Math.floor(((value % Math.pow(256, 3)) % Math.pow(256, 2)) / Math.pow(256, 1))}.${Math.floor((((value % Math.pow(256, 3)) % Math.pow(256, 2)) % Math.pow(256, 1)) / Math.pow(256, 0))}`;
        }
    
        return undefined;
    }
}
