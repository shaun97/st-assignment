export const getSGWeather = async () => {
    let res = await fetch(
        "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast"
    );
    let data = await res.json();
    return data.items[0];
};

export const getWeather: (x: any, y: string) => Array<string> = (
    location: string,
    weatherData: any
) => {
    let res = weatherData.forecasts.reduce((res: any, x: any) => {
        if (x.area.toLowerCase().includes(location)) {
            res.push(x);
        }
        return res;
    }, []);
    console.log(res);
    return res;
};
