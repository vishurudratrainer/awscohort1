const { SQSClient, SendMessageCommand, ReceiveMessageCommand } = require("@aws-sdk/client-sqs")

const sqsClient = new SQSClient({
    region: "us-east-1", credentials: {
        accessKeyId: "",
        secretAccessKey: ""
    }
})


const process=async(queueUrl)=>{
    const params ={QueueUrl:queueUrl,MaxNumberOfMessages:2,WaitTimeInSeconds:5}
    const {Messages} =await sqsClient.send(new ReceiveMessageCommand(params))
    if(Messages && Messages.length > 0){
        console.log("Message received",Messages[0].Body)
    }
}

process("https://sqs.us-east-1.amazonaws.com/201611060253/sample1.fifo")