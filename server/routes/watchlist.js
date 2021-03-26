//https://stackoverflow.com/questions/13404363/avoid-duplicate-entries-on-mongoose-array

const express = require('express');
const router = express.Router();
const User = require('../models/user')


const consoleMessage = require('../helper/consoleMessage');


router.get('/tv/:userId',(req,res)=>{

    const userId = req.params.userId;
    console.log('entered for tv',req.params.userId)

    User.findById({_id:userId})
    .then((user)=>{
        console.log(consoleMessage.sucessMessage('sending tv watchlist'))
        res.status(200).send({
            data : user.tvWatchList
        });
    })
    .catch((err)=>{
        console.log(consoleMessage.errorMessage('tv watchlist error',err));
        res.send('error');
    })
})

router.get('/movie/:userId',(req,res)=>{

    const userId = req.params.userId;
    console.log('entered',req.params.userId)

    User.findById({_id:userId})
    .then((user)=>{
        console.log(user.movieWatchList)
        res.status(200).send({
            data:user.movieWatchList
        });
    })
    .catch((err)=>{
        console.log(consoleMessage.errorMessage('movie watchlist error',err));
        res.send('error');
    })
})



router.put('/',(req,res)=>{
    const {userId,media,mediaId,imgUrl} = req.body;
    
    console.log(req.body);

    
    if(userId==''){
        res.status(500).send({
            sucess:false
        })
    }
    else{

        const addItemToWatchList  = {
            mediaId : mediaId,
            imgUrl : imgUrl
        }
        if(media=='tv'){
            User.updateOne({_id:`${userId}`,'tvWatchList.mediaId':{$ne:mediaId}},{
                $addToSet:{
                    tvWatchList:addItemToWatchList
                }
            }).then((result)=>{
                    console.log(result);
                    res.status(200).send({
                        message :'added to watchlist',
                        sucess : true
                    });
                })
                .catch((error)=>{
                    console.log(consoleMessage.errorMessage(`error watchlist ${error}`))
                    res.status(404).send({
                        message : 'User not exist',
                        sucess : false
                    })
                })
        }else if(media == 'movie'){
            User.updateOne({_id:`${userId}`,'movieWatchList.mediaId':{$ne:mediaId}},{
                $addToSet:{movieWatchList:addItemToWatchList}
            }).then((result)=>{
                    console.log('result',result);
                    res.status(200).send({
                        message :'added to movie watchlist',
                        sucess : true
                    });
                })
                .catch((error)=>{
                    console.log(consoleMessage.errorMessage(`error watchlist ${error}`))
                    res.status(404).send({
                        message : 'User not exist',
                        sucess : false
                    })
                })
        }
        else{
            res.send({
                message : 'nothing matched in watchlist',
                sucess : false
            })
        }
      
    }


})   

module.exports = router;