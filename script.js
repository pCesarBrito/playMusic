import {originalPlayList,sortdPlayListTwo} from  './src.js'
//variaveis*******************************************************************************

const play = document.querySelector('#player');
const like =document.querySelector('#like');
const playIcom= document.querySelector('#icom');
const song=document.querySelector('#audio');

const songName= document.querySelector('#song-name');
const bandNamr= document.querySelector('#band-name');
const cove=document.querySelector('#cove');

const next =document.querySelector('#next');
const previous =document.querySelector('#previous');
const correntProgress=document.querySelector('#corrent-progress');
const Progresscontainer=document.querySelector('#songTo');
const shuffleButton=document.querySelector('#shuffle');
const repeatButton= document.querySelector('#repeat');



let index=0;
let  IspPlay=false;
let isShuffled=false;
let repetOn=false;


//Funções**************************************************************************************
function playSong(){

    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    IspPlay=true; 
    song.play();
   
};

function pauseSong() {

    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    song.pause();
    IspPlay=false;
};

function playOrPause(){
    if(IspPlay==true){
        pauseSong();
    }
    else{
    playSong();
    }
};


//Inicializa Informaões da Musica

function loudSong(){


      
        cove.src=`img/${sortdPlayListTwo[index].arquivo}.jpg`;
        song.src=`songs/${sortdPlayListTwo[index].arquivo}.mp3`;
        songName.innerText=`${sortdPlayListTwo[index].musica}`;
        bandNamr.innerText=`${sortdPlayListTwo[index].artista}`;


           
};

function previousSong(){
    if(index===0)
    {
    index=sortdPlayListTwo.length-1;
    
    }
    else{
        index-=1;
       
    };
   
    loudSong();
    playSong();
};

function nextSong(){
    if( index===sortdPlayListTwo.length-1){
        index=0;
       
    }
    else{
        index +=1;
       
    }
      
        
    loudSong();
    playSong();
    
};  

function upDateBar(){
    //song.currentTime
   // song.duration
    const barWiht=(song.currentTime/song.duration)*100;
    correntProgress.style.setProperty('--progress', `${barWiht}%`);

};


///fun çao clica e para par a musica


function jumpTo(event){
    const width = Progresscontainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = jumpToTime;
  };

  //Funçoes para embaralhar as musicas***********************************************************
  function shuffleArray(preShuffleArray){

    //Duas funçoes parra embaralhar arrays(ambas funcionam. A primeira esta comentada)----------


    ///Emaralha um array-----------------------------------------------
   /*  const size = preShuffleArray.length;
     let currentIndex = size -1;

    while(currentIndex > 0){

        let randomIndex = Math.floor(Math.random()* size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex]
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
       
    } */

    ///emmbaralha um array------------------------------------------------------
    for(let i = preShuffleArray.length -1; i>0;i--)
    {

        const j=Math.floor(Math.random()*(i+1));
        [preShuffleArray[i],preShuffleArray[j]]=[preShuffleArray[j],preShuffleArray[i]];
    }

  };
 
  function shuffleButtonClick( ){
    /* if(isShuffled === false){
        isShuffled = true;
        shuffleArray(playListTwo);
        shuffleButton.classList.remove('button-active');
       
    }
   else if (isShuffled === true){
    isShuffled = false;
    playListTwo = [...playList];  
    shuffleButton.classList.add('button-active');
   
    } */
  
  };
 function repeatButtonClick(){
   if(repetOn===false){
    repetOn=true;
    repeatButton.classList.add('button-active');
   }
   else{
    repetOn=false;
    repeatButton.classList.remove('button-active');
   }

   };

  function nextOrRepeat(){

    if(repetOn===false){
        nextSong();
    }else
    {
        playSong();
    }

  };

 

loudSong();
// eventos***************************************************************************************
play.addEventListener('click',playOrPause);
previous.addEventListener('click',previousSong);
next.addEventListener('click',nextSong);
song.addEventListener('timeupdate',upDateBar);
song.addEventListener('ended',nextOrRepeat);
Progresscontainer.addEventListener('click',jumpTo);
shuffleButton.addEventListener('click',()=>{

    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortdPlayListTwo);
        shuffleButton.classList.add('button-active');
       
    }
   else{
    isShuffled = false;
    sortdPlayListTwo = [...originalPlayList];  
    shuffleButton.classList.remove('button-active');
   
    }
});
repeatButton.addEventListener('click',repeatButtonClick)


