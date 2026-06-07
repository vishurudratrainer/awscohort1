from confluent_kafka import Consumer, KafkaError
from aws_msk_iam_sasl_signer import MSKAuthTokenProvider

def oauth_cb(oauth_config):
    token, expiry_ms = MSKAuthTokenProvider.generate_auth_token("us-east-1")
    return token, expiry_ms / 1000.0

conf = {
    'bootstrap.servers': '://amazonaws.com',
    'security.protocol': 'SASL_SSL',
    'sasl.mechanism': 'OAUTHBEARER',
    'oauth_cb': oauth_cb,
    'group.id': 'my-python-consumer-group',
    'auto.offset.reset': 'earliest'
}

consumer = Consumer(conf)
consumer.subscribe(['my-topic'])

try:
    while True:
        msg = consumer.poll(1.0)
        if msg is None:
            continue
        if msg.error():
            if msg.error().code() == KafkaError._PARTITION_EOF:
                continue
            else:
                print(f"Consumer error: {msg.error()}")
                break

        print(f"Received message: {msg.value().decode('utf-8')}")

except KeyboardInterrupt:
    pass
finally:
    consumer.close()
