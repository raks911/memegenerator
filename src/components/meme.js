import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './styles.modules.css'
export const Meme = () => {
    const [memes,setMemes]=useState([]);
    const [index,setIndex]=useState(0);
    const [captions,setCaptions]=useState([]);
    const history = useNavigate();

    const shuffle = (array) => {
        for(let i=0;i<array.length-1;i++){
            const j=Math.floor(Math.random()*i);
            const temp=array[i];
            array[i]=array[j];
            array[j]=temp;
        }
    }
    useEffect(()=>{
        fetch('https://api.imgflip.com/get_memes').then( res => 
        res.json().then(res => {
            const memes=res.data.memes;
            shuffle(memes);
            setMemes(memes);
        })
        )
    },[])
    useEffect(()=>{
        if(memes.length){
            setCaptions(Array(memes[index].box_count).fill(''));
        }
    },[index,memes])
    // useEffect(()=>{
    //     console.log(captions);
    // },[captions])
    const updateCaption = (e,ind)=> {
        const text=e.target.value || '';
        setCaptions(
            captions.map((cap,i) => {
                if(ind===i){
                    return text;
                }
                else{
                    return cap;
                }
    })
        )
    }
    
    const generateMeme = () => {
        const currentMeme=memes[index];
        const formdata=new FormData();
        formdata.append('username','raks911');
        formdata.append('password','ASH911rex@')
        formdata.append('template_id',currentMeme.id);
        captions.forEach((cap,ind) => formdata.append(`boxes[${ind}][text]`,cap))

         fetch('https://api.imgflip.com/caption_image',{
            method:'POST',
            body:formdata
         }).then(res=>{
            res.json().then(res=>{
                history(`/generated?url=${res.data.url}`)
            })
         })
    }
  return (
    memes.length ?
    <div className='container'>
        <div className='texter'>
        <button className='generator' onClick={() => {generateMeme()}}>Generate</button>
        <button className='skip' onClick={() => {
            setIndex(Math.floor(Math.random()*memes.length))
        }}>Skip</button>
        </div>
        {
            captions.map((cap,ind) => (
                <input  style={{marginTop:20}} onChange={(e) => updateCaption(e,ind)} key={ind} placeholder='write caption for meme'></input>
            ))
        }
        <img className='imga'src={memes[index].url} alt=""></img>
    </div>:<></>
  )
}
