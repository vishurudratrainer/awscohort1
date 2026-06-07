import sys
from confluent_kafka import Producer
from aws_msk_iam_sasl_signer import MSKAuthTokenProvider

# Define a callback helper to generate token dynamically for Kafka
def oauth_cb(oauth_config):
    # Generates a valid IAM token for the specified AWS region
    token, expiry_ms = MSKAuthTokenProvider.generate_auth_token("us-east-1")
    return token, expiry_ms / 1000.0

# Define your MSK configuration
conf = {
    # Replace with your Serverless Bootstrap Broker String from AWS Console
    'bootstrap.servers': '://amazonaws.com',
    
    # Required Security protocols for MSK Serverless IAM
    'security.protocol': 'SASL_SSL',
    'sasl.mechanism': 'OAUTHBEARER',
    
    # Pass the IAM token generator callback
    'oauth_cb': oauth_cb
}

# Optional receipt callback to verify delivery status
def delivery_report(err, msg):
    if err is not None:
        print(f"Message delivery failed: {err}")
    else:
        print(f"Message delivered to {msg.topic()} [{msg.partition()}]")

# Instantiate and run the producer
producer = Producer(conf)

# Trigger token generation and connection
producer.poll(0.0)

# Publish a test message (Change 'my-topic' to your actual Kafka topic)
producer.produce('my-topic', key='key1', value='Hello MSK Serverless!', callback=delivery_report)

# Wait for all messages in the buffer to deliver
producer.flush()
