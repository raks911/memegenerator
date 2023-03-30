import React from 'react'
import './MemeGenerated.css'
import {useNavigate, useLocation } from 'react-router-dom'
import {useState} from 'react'
import {useClipboard} from 'use-clipboard-copy'
export const MemeGenerated = () => {
    const [copied,setCopied]=useState(false);
    const clipboard=useClipboard();
    const history=useNavigate();
    const location=useLocation();
    const url=new URLSearchParams(location.search).get('url');

    const copylink = () => {
       clipboard.copy(url);
       setCopied(true); 
    }
  return (
    <div>
        <button onClick={ () => {
            history('/') } } className='generate'
        >Back To Main Page</button>
        {url && <img src={url} alt=""/>}
        <button onClick={() => { copylink()
        }} className='skip'>
            { copied ? 'Link Copied' : 'Copy Link to clipboard '}
        </button>

    </div>
  )
}
