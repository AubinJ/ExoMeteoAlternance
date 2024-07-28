export default async function handler(req,res) {
    console.log(process.env.CITY);
    console.log(process.env.LANGUAGE);
    try {
        const getWeatherData = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${process.env.CITY}&language=${process.env.LANGUAGE}&limit=1`,
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