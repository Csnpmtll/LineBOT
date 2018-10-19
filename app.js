const express = require('express')
const line = require('@line/bot-sdk')
const app = express()
const port = 8080

const config = {
    channelAccessToken:"TNx09wVXpJenEq6paRD6oBfKXSC1uQuPly7kQ8lVNe7iQua0PGAMun/Fb/hD6tiwEH87KWjGn6Z+VqNqb4x+ztzkTkIKNIa6W2o61VpdRf348AZuTIIkEEWJkOzKiISsCfphErlMEQr02YdXL0lAFwdB04t89/1O/w1cDnyilFU=",
    channelSecret:"da15c18dc1422240d411c59d06f4d258"
}

const client = new line.Client(config);

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.post('/',line.middleware(config),(req,res) => {
    Promise.all(req.body.events.map(handleEvent)).then((result) => res.json(result))
})
function handleEvent(event){
    if(event.message.text == "ขอสติ๊กเกอร์หน่อย"){
        return client.replyMessage(event.replyToken,{
        type:'sticker',
        packageId: "1",
        stickerId: "131"
        })
    }
    if(event.type !== 'message' || event.message.type !== 'text'){
        return Promise.resolve(null)
    }if(event.message.text=="อั๋น"){
        return client.replyMessage(event.replyToken,{
            type:'text',
            text: "อย่าพิมพ์คำนี้ไม่ว่ากับใครอีกเข้าใจไหม"
        })
    }
    return client.replyMessage(event.replyToken,{
        type:'text',
        text: "...."
    })
}

app.listen(port,()=>console.log(`App running ${port}`))