import type { Handler } from '@netlify/functions';

const handler: Handler = async () => {
  const apiToken = process.env.ALWAYSCARE_API_TOKEN;

  if (!apiToken) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API token not configured' }),
    };
  }

  try {
    const response = await fetch('https://api-alwayscare.arham.org/api/external/cases/recent', {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Failed to fetch cases' }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching live cases:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

export { handler };
