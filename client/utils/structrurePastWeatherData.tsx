export const structrurePastWeatherData =(datas:any)=>{

    const timestamps = datas.hourly.time;
    const temperatures = datas.hourly.temperature;
    
    const temperatureData:any = {};
    
    // Combine timestamps and temperatures into a dictionary
    timestamps.forEach((timestamp:any, index:any) => {
        const date = new Date(timestamp).toDateString();
        const temperature = temperatures[index];
        
        // Only add temperature if the date is not already in temperatureData
        if (!(date in temperatureData)) {
            temperatureData[date] = temperature;
        }
    });
    // Convert temperatureData into an array of objects
     const result = Object.keys(temperatureData).map(date => ({ date, temperature: temperatureData[date] }));
    return result
}

