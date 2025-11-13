
const players  = JSON.parse(localStorage.getItem('players'))
const RWCard = document.getElementById('RW')
const LWCard = document.getElementById('LW')
const STCard = document.getElementById('ST')
const CB1Card = document.getElementById('CB1')
const CB2Card = document.getElementById('CB2')
const CM3Card = document.getElementById('CM3')
const CM1Card = document.getElementById('CM1')
const CM2Card = document.getElementById('CM2')
const LBCard = document.getElementById('LB')
const RBCard = document.getElementById('RB')
const GKCard = document.getElementById('GK')
let elevenPlayers = JSON.parse(localStorage.getItem('elevenPlayers')) ||  []
let subPlayers  = JSON.parse(localStorage.getItem('subPlayers')) || []
let squadPlayers  = JSON.parse(localStorage.getItem('squadPlayers')) ||[]
console.log(RWCard.childNodes.length)
if(RWCard.childNodes.length === 0)
{
    console.log('empty')
}
let terrain = false;

function showPlayer(player){
    return `
         <div  class="w-full h-full grid grid-cols-2 items-center  ">
              <div class=" mt-8 flex flex-col items-center justify-end w-full">
                  <p>${player.rating}</p>
                  <p>${player.position}</p>
                  <img class="w-2 h-2" src="${player.logo}" alt="">
              </div>
              <div class="relative right-4 top-2 ">
                  <img class="h-12 w-16" src="${player.photo}" alt="">
              </div>
             
          </div>
          <div class="w-full h-full flex flex-col justify-center mb-2">
              <div class="flex flex items-center justify-center gap-1 mt-[-10px]">
                  <p>${player.name}</p>
                  <img class="w-2 h-2" src="${player.flag}" alt="">
              </div>
              <div class=" flex w-full justify-evenly text-[6px]  	">
                  <div class="flex flex-col">
                      <div class="flex gap-1 leading-none ">
                          <p>DIV</p>
                          <p>${player.pace}</p>
                      </div>
                      <div class="flex gap-1 ">
                          <p>HAN</p>
                          <p>${player.shooting}</p>
                      </div>
                      <div class="flex gap-1 leading-none">
                          <p>KIC</p>
                          <p>${player.passing}</p>
                      </div>
                  </div>
                  <div class="flex flex-col">   
                      <div class="flex gap-1 leading-none">
                          <p>REF</p>
                          <p>${player.dribbling}</p>
                      </div>
                      <div class="flex gap-1">
                          <p>DEF</p>
                          <p>${player.defending}</p>
                      </div>
                      <div class="flex gap-1 leading-none">
                          <p>PHY</p>
                          <p>${player.physical}</p>
                      </div>

                  </div>
                  </div>
           
          </div>
    `
}
function showP(players){
    players.forEach(element => {
   
        if(element.position == 'GK'){
            document.getElementById('GK').setAttribute('data-id', element.id)
            document.getElementById('GK').innerHTML= `
             <div  class="w-full h-full grid grid-cols-2 items-center  ">
                  <div class=" mt-8 flex flex-col items-center justify-end w-full">
                      <p>${element.rating}</p>
                      <p>${element.position}</p>
                      <img class="w-2 h-2" src="${element.logo}" alt="">
                  </div>
                  <div class="relative right-4 top-2 ">
                      <img class="h-12 w-16" src="${element.photo}" alt="">
                  </div>
                 
              </div>
              <div class="w-full h-full flex flex-col justify-center mb-2">
                  <div class="flex flex items-center justify-center gap-1 mt-[-10px]">
                      <p>${element.name}</p>
                      <img class="w-2 h-2" src="${element.flag}" alt="">
                  </div>
                  <div class=" flex w-full justify-evenly text-[6px]  	">
                      <div class="flex flex-col">
                          <div class="flex gap-1 leading-none ">
                              <p>DIV</p>
                              <p>${element.diving}</p>
                          </div>
                          <div class="flex gap-1 ">
                              <p>HAN</p>
                              <p>${element.handling}</p>
                          </div>
                          <div class="flex gap-1 leading-none">
                              <p>KIC</p>
                              <p>${element.kicking}</p>
                          </div>
                      </div>
                      <div class="flex flex-col">   
                          <div class="flex gap-1 leading-none">
                              <p>REF</p>
                              <p>${element.reflexes}</p>
                          </div>
                          <div class="flex gap-1">
                              <p>DEF</p>
                              <p>86</p>
                          </div>
                          <div class="flex gap-1 leading-none">
                              <p>PHY</p>
                              <p>98</p>
                          </div>
    
                      </div>
                      </div>
               
              </div>
            `
        }
        else if ( element.position == 'ST'){
            document.getElementById('ST').setAttribute('data-id', element.id)
            document.getElementById("ST").innerHTML = showPlayer(element)
        }
        else if ( element.position == 'LW'){
            document.getElementById('LW').setAttribute('data-id', element.id)

            document.getElementById("LW").innerHTML = showPlayer(element)
        }
        else if ( element.position == 'LB'){
            document.getElementById('LB').setAttribute('data-id', element.id)

            document.getElementById("LB").innerHTML = showPlayer(element)
        }
        else if ( element.position == 'RB'){
            document.getElementById('RB').setAttribute('data-id', element.id)

            document.getElementById("RB").innerHTML = showPlayer(element)
        }
        else if ( element.position == 'RW'){
            document.getElementById('RW').setAttribute('data-id', element.id)

            document.getElementById("RW").innerHTML = showPlayer(element)
        }
        else if ( element.position == 'CM'){
            document.getElementById('CM').setAttribute('data-id', element.id)

            document.getElementById("CM").innerHTML = showPlayer(element)
        }
        else if ( element.position == 'CBL' ){
            document.getElementById('CBL').setAttribute('data-id', element.id)

            document.getElementById("CBL").innerHTML = showPlayer(element)
        }
        else if ( element.position == 'CBR' ){
            document.getElementById('CBR').setAttribute('data-id', element.id)

            document.getElementById("CBR").innerHTML = showPlayer(element)
        }
        else if ( element.position == 'CML' ){
            document.getElementById('CML').setAttribute('data-id', element.id)

            document.getElementById("CML").innerHTML = showPlayer(element)
        }
        else if ( element.position == 'CMR' ){
            document.getElementById('CMR').setAttribute('data-id', element.id)

            document.getElementById("CMR").innerHTML = showPlayer(element)
        }
        
    });
}
const playerContainer = document.getElementById("players-container");

function showPlayersOnTerrain(players){
    players.forEach(element => {
        playerContainer.innerHTML = ``
        const div = document.createElement('div')
        div.className = 'card flex flex-col justify-between items-center text-md'
        div.innerHTML = showPlayers(element)

        playerContainer.appendChild(div)

    })
}
function deletePlayer(idd){
    let i = squadPlayers.findIndex(player=> player.id == idd)
    console.log(i)
    squadPlayers.splice(i,1)
    localStorage.setItem('squadPlayers', JSON.stringify(squadPlayers))
    i = elevenPlayers.findIndex(player=> player.id == idd)
    console.log(i)
    elevenPlayers.splice(i,1)
    showP(elevenPlayers)

    localStorage.setItem('elevenPlayers', JSON.stringify(elevenPlayers))
 
    showReservePlayers(squadPlayers)
}
function showReservePlayers(list){
    document.getElementById('players-list').innerHTML = ``
    console.log(list)
    list.forEach(p => {
        document.getElementById('players-list').innerHTML += `
         <div  class="w-[40%]  bg-[#161A1D] h-[90px] flex gap-4 rounded-md">
          <div class="h-full w-[40%] flex justify-center">
            <img class="h-16 w-16" src="${p.photo}" alt="">
          </div>
          <div class="h-4/5 w-[60%] flex flex-col justify-evenly ">
              <p>${p.name}</p>
              <p>${p.rating}</p>
              <p>${p.position}</p>
          </div>
          <div class="m-4 cursor-pointer" onclick="deletePlayer(${p.id})"> <i class="fa-solid fa-trash" style="color: #bc2f2f;"></i>
 </div>
        </div>
        `

    })
}
const modal = document.getElementById('modal')
function showAllPlayersListl(){
    modal.style.display="block"
    document.getElementById('modal-title').innerText ='All Players'
    console.log(squadPlayers)
    showReservePlayers(squadPlayers)

}
function showReserveList(){
    document.getElementById('modal-title').innerText ='Reserve Players'
    modal.style.display="block"
    console.log(subPlayers)
    showReservePlayers(subPlayers)
}
    function showPlayers(player){
        return `
        <div class="w-full flex h-[55%]">
              <div class="w-[60%] h-full flex justify-end items-end ">
                <div class="flex flex-col items-center justify-center mr-1">
                  <p>${player.rating}</p>
                  <p>${player.position}</p>
                  <img class="h-6" src="${player.photo}" alt="">
                </div>

              </div>
              <div class="h-full w-full flex  justify-end items-end">
                <div>
                  <img class="h-24 w-full relative right-4" src="${player.logo}" alt="">
                </div>
              </div>

             </div>
             <div class="w-full h-[45%] flex flex-col">
                  <div class="w-full h-[30%] flex justify-center gap-2 items-center">
                    <p>${player.name}</p>
                    <img class="h-4" src="${player.photo}" alt="">

                  </div>
                  <div class="w-full h-full flex gap-8">
                    <div class="h-full w-[50%] flex flex-col items-end text-xs">
                      <div class="flex gap-2">
                        <p>${player.position == 'GK' ? 'DIV' : 'PAC'}</p>
                        <p>${player.position == 'GK' ? player.diving : playing.pace}</p>
                      </div>
                      <div class="flex gap-2">
                        <p>${player.position == 'GK' ? 'HAN' : 'SHO'}</p>
                        <p>${player.position == 'GK' ? player.handling : playing.shooting}</p>
                      </div>
                      <div class="flex gap-2">
                        <p>${player.position == 'GK' ? 'KIC' : 'PAS'}</p>
                        <p>${player.position == 'GK' ? player.kicking : playing.passing}</p>
                      </div>
                    </div>
                    <div class="h-full w-[50%] flex flex-col items-start text-xs">
                      <div class="flex gap-2">
                        <p>${player.position == 'GK' ? 'REF' : 'DRI'}</p>
                        <p>${player.position == 'GK' ? player.reflexes : playing.dribbling}</p>
                      </div>
                      <div class="flex gap-2">
                        <p>${player.position == 'GK' ? 'SPE' : 'DEF'}</p>
                        <p>${player.position == 'GK' ? player.speed : playing.defending}</p>
                      </div>
                      <div class="flex gap-2">
                        <p>${player.position == 'GK' ? 'POS' : 'PHY'}</p>
                        <p>${player.position == 'GK' ? player.positioning : playing.physical}</p>
                      </div>
                    </div>


                  </div>

             </div>
        `
    }
    
    
   const allCards = document.querySelectorAll('.card')
   let filteredPlayers;
   allCards.forEach(card => {
    card.addEventListener("click", function(){
        if(card.getAttribute('id') == 'RW' ) 
        {
            
            showAddToSquadModal('RW')

        } 
        else if (card.getAttribute('id') == 'ST')
        {
            showAddToSquadModal('ST')

        }
        else if (card.getAttribute('id') == 'LW')
            {
                showAddToSquadModal('LW')

            }
         else if (card.getAttribute('id') == 'CML')
            {
                showAddToSquadModal('CML')

            }
         else if (card.getAttribute('id') == 'CM')
            {
                showAddToSquadModal('CM')


            }
         else if (card.getAttribute('id') == 'CMR')
            {
                showAddToSquadModal('CMR')


            }
        else if (card.getAttribute('id') == 'LB')
            {
                showAddToSquadModal('LB')


            }
        else if (card.getAttribute('id') == 'RB')
            {
                showAddToSquadModal('RB')


            }
        else if (card.getAttribute('id') == 'CBL')
            {
                showAddToSquadModal('CBL')


            }
        else if (card.getAttribute('id') == 'CBR')
            {
                showAddToSquadModal('CBR')


            }
        else if (card.getAttribute('id') == 'GK')
            {
                showAddToSquadModal('GK')


            }
    })
    
   });
   function listPlayersOnModal(players){
    if(players.length == 0){
        document.getElementById('playersArea').innerHTML = `<p class="text-[#ff0000]"> NO PLAYER WITH THIS POSITION OR NAME <p>`

    }
    else {
    document.getElementById('playersArea').innerHTML = ``
    players.forEach(player => {
        document.getElementById('playersArea').innerHTML += `<div onclick="addPlayerToSquad(${player.id})" class="w-2/5  bg-[#161A1D] h-2/5 flex gap-4 rounded-md">
          <div class="h-full w-[40%] flex justify-center">
            <img class="h-16 w-16" src="${player.photo}" alt="">
          </div>
          <div class="h-4/5 w-[60%] flex flex-col justify-evenly">
              <p>${player.name}</p>
              <p>${player.rating}</p>
              <p>${player.position}</p>
          </div>
        </div>`
    })}

   }
   let filtPlayer 
   let allPlayer = players
   function showPlayersOnModal(){

       console.log(squadPlayers.length)
       if(squadPlayers.length == 0){
           filtPlayer = players
           listPlayersOnModal(filtPlayer)
   
       }
       else {
        filtPlayer = []
        
           players.forEach(player => {
               let find = false;
               for(let i =0 ; i<squadPlayers.length;i++)
               {
               
                   if(squadPlayers[i].id == player.id){
                    console.log('f')
                       find = true
                       break;
                   }
               }
               if (!find){
                   filtPlayer.push(player)
               }
           })
           console.log(filtPlayer)
           allPlayer = filtPlayer
           listPlayersOnModal(filtPlayer)
       }
   }
   function ifExists(p){
    elevenPlayers.forEach(player => {
        if(player.position == p.position)
        {
            return true;
        }
    })

   }
  function addPlayerToSquad(idd){
    if(terrain){

        let fi = false
        console.log("click")
        let i;
        squadPlayers.forEach((p, index) => {
            if(p.id == idd)
            {
                i = index
            }
        })
        const temp_id= document.getElementById(squadPlayers[i].position).getAttribute('data-id')

        elevenPlayers.forEach(ep => {
            if (ep.id == squadPlayers[i].id)
            {fi = true}
        })
        if(fi)
        {
              showP(elevenPlayers)
                document.getElementById('addToSquadModal').style.display="none"
        }
        else {
            if(temp_id){
                console.log(temp_id)
                let ind ;
                 elevenPlayers.forEach(p => {
                     if (p.id == temp_id)
                         console.log(p)
                 })
                elevenPlayers.forEach((p,index) => {
                 
                 if(p.id == temp_id ){
                     ind = index
                 }
                })
                elevenPlayers.splice(ind,1)
                subPlayers.push(squadPlayers[ind])
                 elevenPlayers.push(squadPlayers[i]);
                 localStorage.setItem('elevenPlayers', JSON.stringify(elevenPlayers))
                 console.log(elevenPlayers)
                 showP(elevenPlayers)
                 document.getElementById('addToSquadModal').style.display="none"
            } else {
                elevenPlayers.push(squadPlayers[i]);
                localStorage.setItem('elevenPlayers', JSON.stringify(elevenPlayers))
                console.log(elevenPlayers)
                showP(elevenPlayers)
                document.getElementById('addToSquadModal').style.display="none"
              
            }
       
        }
   

    }
    else {
    let i;
    players.forEach((p, index) => {
        if(p.id == idd)
        {
            i = index
        }
    })
    squadPlayers.push(players[i]);
            localStorage.setItem('squadPlayers', JSON.stringify(squadPlayers))

    console.log(squadPlayers)
    // if(squadPlayers.length != 0) {
    //     localStorage.setItem('squadPlayers', JSON.stringify(squadPlayers))
    //     if(elevenPlayers.length < 11 ){
    //         document.getElementById('confirmModal').style.display="flex"

    //         document.getElementById('yes-btn').addEventListener('click', clickedYes, { once: true })
    //        document.getElementById('no-btn').addEventListener('click', clickedNo)

    //        function clickedYes(){
    //         if(ifExists(players[i])){
    //             alert('player with this position already exists')
    //             subPlayers.push(players[i])
    //             localStorage.setItem('subPlayers', JSON.stringify(subPlayers))
            
    //         } else 
    //         {
    //             elevenPlayers.push(players[i])
    //         localStorage.setItem('elevenPlayers', JSON.stringify(elevenPlayers))
    //         showP(elevenPlayers)

    //         }
    //         document.getElementById('confirmModal').style.display="none"

    //         showPlayersOnModal();

            
    //     }
    //     function clickedNo(){
    //         subPlayers.push(players[i])
    //      localStorage.setItem('subPlayers', JSON.stringify(subPlayers))
    //      showPlayersOnModal();
    //      document.getElementById('confirmModal').style.display="none"

    //     }
            
    //     } else
    //     {
    //         subPlayers.push(players[i])
    //         localStorage.setItem('subPlayers', JSON.stringify(subPlayers))
    //     }
    // } 
    showPlayersOnModal();
    }   
    

   }

  
    
   function showAddToSquadModal(pos=null){
    terrain = false
    if(pos){
        terrain = true;
        document.getElementById('addToSquadModal').style.display="flex"
        document.getElementById('positions').style.display='none'
        document.getElementById('searchPlayer').style.display='none'

        let temp_P = squadPlayers.filter(player => player.position == pos)
        console.log(temp_P)
        listPlayersOnModal(temp_P)
    }
    else
    {
        document.getElementById('addToSquadModal').style.display="flex"
        document.getElementById('positions').style.display='block'
        document.getElementById('searchPlayer').style.display='block'


        showPlayersOnModal()
        const pos = document.getElementById("positions")
        pos.addEventListener('change', function(){
            if(pos.value == "")
            {
                filtPlayer = allPlayer;
                listPlayersOnModal(filtPlayer)
            }
            else {
                filtPlayer = filtPlayer.filter(player => player.position == pos.value)
                listPlayersOnModal(filtPlayer)
    
            }
        })
        const search = document.getElementById('searchPlayer')
        search.addEventListener('keyup', function(){
            let searchedPlayers = []
    
            const a = search.value.trim().toUpperCase()
            filtPlayer.forEach(player => {
                const name = player.name.toUpperCase()
                if(name.indexOf(a) > -1)
                {
                    searchedPlayers.push(player)
                    listPlayersOnModal(searchedPlayers)
    
                } else {
                    listPlayersOnModal(searchedPlayers)
    
                }
            })
    
    
        })
    }
  
   
   }
   showP(elevenPlayers)
