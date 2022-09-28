import React,{useEffect, useState} from 'react'
import "./App.css";

                // to get the data from localstorage when we refresh the page
                  const getLocalStore = () => {
                      let list=localStorage.getItem('listj');           //listj is copy of sum but listj only use for local storage.

                     if(list){  //if something present in the list
                     return JSON.parse(localStorage.getItem('listj')); //we have to return a array value in sum thats why we convert loccal storage into arrayy because local storage was in string format
                     }else{
                     return [];                                       //return empty  array if no data in the list
                            }
                           }
function C2()
   {     
    const [text,setText]=useState("");
    const [sum,setSum]=useState(getLocalStore);           //array of all list items & reserve empty array to store all list of the to do items submitted
    const [togglesubmit,setToggle]=useState(false);      //to changge button from submit to update
    const [editedvalue,setEditedvalue]=useState([]);    //for edit
   
   
  //action perform after we submit form
    function submitForm(e)
    {   
        e.preventDefault();                         //stop to reloadd the page after submit
        if(text=="")                              //if we are try to submit empty input textarea the do nothing
        {
           alert("please fill the data");
        }
        else if(text && togglesubmit)         //it run when we do edit(input field is not empty and update butten is on-or visible)
        {
            editedvalue.text=text;          //assign updated text into previous data i.e (text:text)
            setToggle(false);              //again show the submit button after click on update button
            setText("");                  //make the input field empty after click on update button
        }
        
        else{                    //it run when we do submit    
         const newEntry={  id:new Date().getTime().toString(),
                           text:text
                      };                //object
          setSum([newEntry,...sum]);//if we swap position of these two argument then new data gonna add  at the bottom and in this case new data ginna add on the top of giveb list;
           setText("");               /* empty the input fieldvalues after submit,*/
                    }
                
    }
    function edit(e)
    {   let edited=sum.find((elemt)=>{      //assign that element in edited whose id is clicked('edited' is behave as object) 
        return elemt.id===e;               //sum array me subhi element ki id ko compair karayenge and jub id match ho jaayegi rhe us element ko edited me daal denge
            })
            setText(edited.text);        //edited me id bhi hai and text bhi so we just put text of edited in text of input field
        setToggle(true);                   //we change submit button to update
        setEditedvalue(edited);        //we assign 'edited' object in editedvalue for further use
                     
    }

    //we set the copy values of sum array in local storage by name listj(it run each times when we change value in input feld)
   
    useEffect(()=>{          //we can write any name insted of listj
        localStorage.setItem('listj' ,JSON.stringify(sum))    //localstoragge accept only string value so we conver sum into string with the help of JSON.
    },[sum]);                                               //how many times this function runs to store each value depent on value of sum

    //deleting all element list items

     function clearall(){
        setSum([]);                                        //give empty array in textarray
        setText("");
     }
     //deleting single elements
     function onedelete(id){
        const newarr=sum.filter((coming)=>            //newarr behave as array oflist items except clicked item
        {
            return coming.id !== id;                //returning only list item whose id is not matching with clicked item
        })
        setSum(newarr);       
                }
     
     
      
    
   return (
    // You can see value of text is continously changing after do
   <>
    
   <h1>Hey, Welcome in To-do <br></br>{text}</h1> 
  
      <form action="" onSubmit={submitForm}>
                  
        <input type = "text" placeholder="text" autoComplete='off'
         value={text}        //default value at email
         onChange={(e)=>setText(e.target.value)
         //change value ko email me daal di and email ko input ke value me daal di
         //jese hi input field ko change karenge wese hi text variable ki value update ho jaayegi
         }             
         />
         {   //when we click on edit button then update button will show at the place of submit button 

            togglesubmit ? <button type="submit" onClick={submitForm}>update</button> : <button type="submit">submit</button>

         }         
      </form>
<div>        
        {
           sum.map( (ev)=>{
            return (
                     <div key={ev.id}>
                     <p>{ev.text}
                      <button onClick={()=>edit(ev.id)}>edit</button>
                      <button onClick={()=>onedelete(ev.id)}>delete one</button>
                     </p>                                                                
                     </div>                         
                    )
                })
        }
</div>
<br></br>
<button onClick={clearall}>Delete all</button>

  </>)   
}
export default C2;


/* for edit
1. we create a variable 'editeblevalue' with the help of use state
2. we store the list item which is clicked in the editeblevalue as object(id+text);
3. when we clic ko edit then only text of clicked item will pasted in text area
 and that clicked list item wil be get stored in editeblevalue as object.
4. when weclickon update then we assign text of inpute text field in the text of editablevalue.
5. after all these things we empty the inpute text field
6. after click on update we empty or change the update button to submit button.
*/


/*for storage
1. we just use localStorage.setItem()
    and localStorage.getItem()
2. data alwase store in string format in localstorage.
3. when we submit or update or delete any data it will go to sum and copy of 'sum' will store in 'listj' array variable 
   and this 'listj' variable help to store values of 'sum' in local storage.
4. when we refresh the page then get data function will run and assign value of 'listj' in sum again 
   :- value of sum will not get loose.
5. 

*/