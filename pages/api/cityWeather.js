export default async function handler(req, res) {
    try {

        const { latitude, longitude, timezone,} = req.body;

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_direction_10m,rain,wind_speed_10m,weather_code&timezone=${timezone}&forecast_days=1&daily=sunrise,sunset&hourly=visibility`;

        const getWeatherData = await fetch(
            url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!getWeatherData.ok) {
            throw new Error('Network response is not ok');
        }

        const data = await getWeatherData.json();

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}
