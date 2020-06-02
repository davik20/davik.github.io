
const UICONTROLLER = (function(){

     domStrings = {
         template: document.querySelector(".template"),
         viewDetails : document.querySelectorAll(".viewDetails")
        
     }
    

    return {
        domStrings: domStrings,

        displayCollection: (collection, id, values) => {

            let row = "";

            



            if (id === 0) {
                domStrings.template.innerHTML = `<div class="account">
                <div class="account-main">
                    <p class="account-main__balance">Balance</p>
    
                    <p class="account-main__amount"> ${values[id].total}</p>
    
                    <a href="" data-val="0" class="account-main__right-arrow viewDetails goBack" style="font-size: 1.5rem"> &larr; Back</a>
                </div> </div>`;
    
            }else {
                domStrings.template.innerHTML = ` <div class="account-card account-card--${id}"> 
                <p class="account-card__type">${values[id].individual}</p>
                <p class="account-card__addition">${id===1 ? '4%' : ""}</p>
                <p class="account-card__amount">${values[id].total}</p>
                 <a href=""  data-val="${id}" class="account-card__right-arrow viewDetails goBack" style="font-size: 1.5rem">&larr; Back</a>

            </div> `
            }
            // getting items into a container
           collection.forEach(item => {
              row += `  <tr class="table__body-row">
              <td class="table__body-item table__body-item--type">${item.type}</td>
              <td class="table__body-item">${item.date}</td>
              <td class="table__body-item"><img class="currency-image" src="img/dollar.jpg" > </td>
              <td class="table__body-item">$${item.amount}</td>
              <td class="table__body-item "><span class="table__body-item--${item.status}">${item.status}</span></td>
          </tr>` ;

           });

           domStrings.template.innerHTML += `<div class="transactions u-margin-bottom-large">
           <h1 class="heading-2  u-text-align-center u-margin-bottom-medium">Latest transactions</h1>
           <table class="table u-margin-bottom-small "> 
               <thead class="table__head">
                   <tr class="table__head-row">
                       <th class="table__head-item">Transaction Type</th>
                       <th class="table__head-item">Date</th>
                       <th class="table__head-item">Currency</th>
                       <th class="table__head-item">Amount</th>
                       <th class="table__head-item">Status</th>
                       
                   </tr>

               </thead>


               <tbody class="table__body">
                   ${row}
               </tbody>

           </table>

           <div class="u-float-right-button ">
           <a href="" class="view-all ">View All <span>&rarr;</span></a>
           </div>

           </div>

           <div class="bitcoin-area">
           <div>
               <div style="height:560px; background-color: #FFFFFF; overflow:hidden; box-sizing: border-box; border: 1px solid rgb(154,252, 207);  border-radius: 9px; text-align: right; line-height:14px; font-size: 12px; font-feature-settings: normal; text-size-adjust: 100%; box-shadow: inset 0 -20px 0 0 #56667F;padding:1px;padding: 0px; margin: 0px; width: 100%;"><div style="height:540px; padding:0px; margin:0px; width: 100%;"><iframe src="https://widget.coinlib.io/widget?type=chart&theme=light&coin_id=859&pref_coin_id=1505" width="100%" height="536px" scrolling="auto" marginwidth="0" marginheight="0" frameborder="0" border="0" style="border:0;margin:0;padding:0;line-height:14px;"></iframe></div><div style="color: #FFFFFF; line-height: 14px; font-weight: 400; font-size: 11px; box-sizing: border-box; padding: 2px 6px; width: 100%; font-family: Verdana, Tahoma, Arial, sans-serif;"><a href="https://coinlib.io" target="_blank" style="font-weight: 500; color: #FFFFFF; text-decoration:none; font-size:11px">Cryptocurrency Prices</a>&nbsp;by Coinlib</div></div>
           </div>

          

          

              
        `;


        }


    }

}())


const DBCONTROLLER = (function(){
 const values = [
     {
         individual: 'Main Wallet,
         total: "$600"
     },

     {
        individual: 'Savings Wallet',
        total: "$40"
    },

    {
        individual: 'Summer Wallet',
        total: "$140"
    },

    {
        individual: 'Withdrawn',
        total: "$1500"
    }



 ];

  const data = [
      [    
          {
              type: "Deposit",
              date: "01/06/2020",
              curreny: "bitcoin",
              amount: 20,
              status: 'failed'
            
          }, 

          {
            type: "Earned",
            date: "30/05/2030",
            curreny: "bitcoin",
            amount: 55,
            status: 'pending'
          
        },

        {
            type: "Earned",
            date: "25/5/2020",
            curreny: "bitcoin",
            amount: 200,
            status: 'confirmed'
          
        }

      ],

      [

      ],

      [
        {
            type: "Deposit",
            date: "2/6/2020",
            curreny: "bitcoin",
            amount: 2000,
            status: 'confirmed'
          
        }, 

        {
          type: "Deposit",
          date: "1/5/2020",
          curreny: "bitcoin",
          amount: 150,
          status: 'confirmed'
        
      },

      {
          type: "Deposit",
          date: "5/9/2018",
          curreny: "bitcoin",
          amount: 20,
          status: 'confirmed'
        
      }

    ],

    [
        {
            type: "Withdrawal",
            date: "3/3/2020",
            curreny: "bitcoin",
            amount: 190,
            status: 'confirmed'
          
        }, 

        {
          type: "Withdrawal",
          date: "4/2/2020",
          curreny: "bitcoin",
          amount: 165,
          status: 'pending'
        
      },

      {
          type: "Withdrawal",
          date: "1/2/2018",
          curreny: "bitcoin",
          amount: 2000,
          status: 'failed'
        
      }

    ]
  ];

   return {
       data: data,
       values: values
   }


}())




const controller = (function(UICTRL, DBCTRL){
       
    let state = {
        template: null,
        id: null,
        collection: null
    }


    // helper functions //

    const collection = (db , id) => {
       
        let result = db[id];

        state.collection = result;

     
       }
 

 

   



    return {

    init: function (event) {
    // 1 Put contents of template inside state to store //
    event.preventDefault();

    event.target.parentElement.classList.add('scale-up');
   
        state.template = UICTRL.domStrings.template.innerHTML;




   
     
        let id = parseInt(event.target.dataset.val);
        state.id = id;
    
       setTimeout(()=>{

            //2 Get individual collection //
        collection(DBCTRL.data, state.id);
     
        // 3 Give collection to UI controller to display //
        UICTRL.displayCollection(state.collection, state.id, DBCTRL.values);
       }, 1000) ;


    
       
    
   
      
       /* Going Back */
  

        


    }

}

}(UICONTROLLER, DBCONTROLLER))



// initialize application


document.querySelectorAll('.viewDetails').forEach(item =>{
    item.addEventListener('click', controller.init );
})


   


document.querySelector('.plus').addEventListener('click', e => {
    event.target.classList.toggle('spin')
    
})


