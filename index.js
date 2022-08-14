const express = require('express');
const Stripe = require('stripe')
const cors = require('cors')

//Initializations
const app = express();

const stripe = new Stripe(process.env.SECRET_KEY_STRIPE)

app.use(cors({origin:'http://localhost:3000'}))//desde donde me envían la información
app.use(express.json())

app.post('/api/payment', async(req,res)=>{
    try{
        const {id,amount} = req.body;
        const payment = await stripe.paymentIntents.create({
            amount,
            currency:"USD",
            desription:'Productos',
            payment_method: id,
            confirm:true
        })
        res.send({message:'Succesfull payment'})
    }catch(error){
        res.json({message:error.raw.message})
    }
});
//Start Server 
app.listen(3001,()=>{
    console.log('Server on port',3001);
})  

