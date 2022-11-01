import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { checkUEN } from "../util/uenCheck";
import { getWeather, getSGWeather } from "../util/weatherForecast";

const options = {
    weekday: "short",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
};

export default function Home() {
    const [uen, setUen] = useState<any>("");
    const [uenMessage, setUenMessage] = useState<string>("");

    const [location, setLocation] = useState<any>("");
    const [weather, setWeather] = useState<any>([]);

    const [weatherData, setWeatherData] = useState<any>("");

    useEffect(() => {
        const getInitialWeather = async () => {
            setWeatherData(await getSGWeather());
        };

        getInitialWeather();
    }, []);

    const handleCheckUen = (uen: string) => {
        console.log(uen);
        const checkResult: string = checkUEN(uen);
        setUenMessage(checkResult);
        setUen(uen);
    };

    const handleWeatherForecast = (location: string) => {
        setLocation(location);
        const weatherForecast: any = getWeather(location, weatherData);
        setWeather(weatherForecast);
    };

    return (
        <div className="h-screen">
            <Head>
                <title>ST Assignment</title>
                <meta name="description" content="UEN and Weather" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="w-full flex flex-col items-center divide-y divide-solid p-5">
                <div className="h-48 text-white flex flex-col justify-center items-center mt-10">
                    <h1 className="text-2xl">UEN Checker</h1>
                    <br></br>
                    <p
                        className={
                            uenMessage === "Valid UEN"
                                ? "text-green-500"
                                : "text-red-500"
                        }
                    >
                        {uenMessage}
                    </p>
                    <br></br>
                    <input
                        className="h-auto bg-gray-100 text-black shadow-inner rounded-xl p-2"
                        id="uen"
                        type="uen"
                        value={uen}
                        onChange={(e) => handleCheckUen(e.target.value)}
                        placeholder="Enter UEN"
                    />
                </div>
                <div className="w-full text-white flex flex-col justify-center items-center mt-10 pt-10">
                    <h1 className="text-2xl">2 Hour Weather Forecast</h1>
                    <br></br>
                    <p>
                        CAA{" "}
                        {new Date(weatherData.timestamp).toLocaleDateString(
                            "en-us",
                            options
                        )}
                    </p>
                    <br></br>
                    <input
                        className="h-full bg-gray-100 text-black shadow-inner rounded-xl p-2"
                        id="location"
                        type="location"
                        value={location}
                        onChange={(e) => handleWeatherForecast(e.target.value)}
                        placeholder="Enter Location"
                    />
                    <br></br>
                    <div className="grid grid-cols-2 gap-2">
                        {weather.map((x: any) => {
                            return (
                                <div
                                    id={x.area}
                                    className="flex flex-row justify-between gap-10 mx-10"
                                >
                                    <p>{x.area}: </p>
                                    <p>{x.forecast}</p>
                                </div>
                            );
                        })}
                    </div>
                    <br></br>
                </div>
            </main>
        </div>
    );
}
