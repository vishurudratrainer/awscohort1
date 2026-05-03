const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs")

const sqsClient = new SQSClient({
    region: "us-east-1", credentials: {
        accessKeyId: "",
        secretAccessKey: ""
    }
})

const sendMessage = async (queueUrl, body) => {
    const params = { QueueUrl: queueUrl, MessageBody: JSON.stringify(body),MessageGroupId:"1" }
    let res = await sqsClient.send(new SendMessageCommand(params))
    console.log(JSON.stringify(res))
}


sendMessage("https://sqs.us-east-1.amazonaws.com/201611060253/sample1.fifo",{"name":"Vishwa1","age":55})