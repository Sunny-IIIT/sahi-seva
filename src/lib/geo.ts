/**
 * Fetches the estimated driving time between two coordinates using Mapbox Directions API.
 * 
 * @param origin - The starting coordinates [longitude, latitude]
 * @param destination - The ending coordinates [longitude, latitude]
 * @returns The estimated driving duration in minutes
 */
export async function getETA(origin: [number, number], destination: [number, number]): Promise<number | null> {
  try {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!accessToken) {
      console.warn('Mapbox access token is missing.');
      return null;
    }

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?access_token=${accessToken}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.routes && data.routes.length > 0) {
      // duration is provided in seconds
      return Math.round(data.routes[0].duration / 60);
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching ETA:', error);
    return null;
  }
}
