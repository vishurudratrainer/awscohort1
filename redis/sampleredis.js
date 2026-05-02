const Redis = require('ioredis');

// 1. Initialize the client using your AWS endpoint
const redis = new Redis({
  host: 'myredis-8vycj7.serverless.use1.cache.amazonaws.com',  port: 6379,
  tls: {}, // Use {} to enable TLS (required for most ElastiCache setups)
  connectTimeout: 10000
});

// 2. Simple Caching Logic
async function getCachedData(key) {
  try {
    // Check cache
    const cachedResult = await redis.get(key);
    if (cachedResult) {
      console.log('Cache Hit');
      return JSON.parse(cachedResult);
    }

    // Cache Miss: Fetch from Database (mock example)
    console.log('Cache Miss');
    const dataFromDB = { id: 1, name: 'Sample Data' };

    // Save to Redis with an expiration (e.g., 3600 seconds)
    await redis.set(key, JSON.stringify(dataFromDB), 'EX', 3600);
    
    return dataFromDB;
  } catch (error) {
    console.error('Redis Error:', error);
  }
}

getCachedData("1")

