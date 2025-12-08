interface RawCheckpoint {
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description?: string;
  sourceUrl: string;
}

export async function scrapeOVICheckpoint(): Promise<RawCheckpoint[]> {
  const url = 'https://ovicheckpoint.com/';

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();

    const checkpoints: RawCheckpoint[] = [];

    const checkpointPattern = /<div[^>]*class="[^"]*checkpoint[^"]*"[^>]*>([\s\S]*?)<\/div>/gi;
    const matches = html.matchAll(checkpointPattern);

    for (const match of matches) {
      const blockHtml = match[1];

      const titleMatch = blockHtml.match(/<h[23][^>]*>(.*?)<\/h[23]>/i);
      const locationMatch = blockHtml.match(/location[^>]*>(.*?)</i) ||
                           blockHtml.match(/address[^>]*>(.*?)</i);
      const dateMatch = blockHtml.match(/(\d{1,2}\/\d{1,2}\/\d{4})/);
      const timeMatch = blockHtml.match(/(\d{1,2}:\d{2}\s*(?:AM|PM))/i);

      if (titleMatch && locationMatch && dateMatch) {
        const title = titleMatch[1].replace(/<[^>]*>/g, '').trim();
        const location = locationMatch[1].replace(/<[^>]*>/g, '').trim();
        const dateStr = dateMatch[1];
        const timeStr = timeMatch ? timeMatch[1] : '6:00 PM';

        const startDate = new Date(`${dateStr} ${timeStr}`).toISOString();
        const endDateObj = new Date(startDate);
        endDateObj.setHours(endDateObj.getHours() + 4);
        const endDate = endDateObj.toISOString();

        checkpoints.push({
          title,
          location,
          startDate,
          endDate,
          sourceUrl: url,
        });
      }
    }

    if (checkpoints.length === 0) {
      const fallbackPattern = /<article[^>]*>([\s\S]*?)<\/article>/gi;
      const articleMatches = html.matchAll(fallbackPattern);

      for (const match of articleMatches) {
        const article = match[1];

        const titleMatch = article.match(/<h[1-4][^>]*>(.*?)<\/h[1-4]>/i);
        const textContent = article.replace(/<[^>]*>/g, ' ').trim();

        const locationPattern = /(?:at|location|address):\s*([^,\n]+(?:,\s*[^,\n]+){0,2})/i;
        const datePattern = /(\d{1,2}\/\d{1,2}\/\d{4})/;
        const timePattern = /(\d{1,2}:\d{2}\s*(?:AM|PM))/i;

        const locationMatch = textContent.match(locationPattern);
        const dateMatch = textContent.match(datePattern);
        const timeMatch = textContent.match(timePattern);

        if (titleMatch && locationMatch && dateMatch) {
          const title = titleMatch[1].replace(/<[^>]*>/g, '').trim();
          const location = locationMatch[1].trim();
          const dateStr = dateMatch[1];
          const timeStr = timeMatch ? timeMatch[1] : '6:00 PM';

          const startDate = new Date(`${dateStr} ${timeStr}`).toISOString();
          const endDateObj = new Date(startDate);
          endDateObj.setHours(endDateObj.getHours() + 4);
          const endDate = endDateObj.toISOString();

          checkpoints.push({
            title,
            location,
            startDate,
            endDate,
            sourceUrl: url,
          });
        }
      }
    }

    console.log(`Scraped ${checkpoints.length} checkpoints from OVICheckpoint.com`);
    return checkpoints;
  } catch (error) {
    console.error('OVICheckpoint scraper error:', error);
    throw error;
  }
}
