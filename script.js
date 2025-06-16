const incomeInput=document.getElementById("incomeLabel")


//Income
const incomeSrc=document.getElementById("src");
const incomeDate=document.getElementById("amtDate");
const incomeNote=document.getElementById("amtNote");
const incomeAdder=document.getElementById("incomeAmt")

//Expenses
const dateAdder=document.getElementById("expenseDate")
const payeeName=document.getElementById("payeeID")
const expCategory=document.getElementById("expenseCat")
const expAmt=document.getElementById("expenseAmt")
const exp=document.getElementById("expenses")

//Sound effects
const incomeSound=new Audio("income.mp3")
const expenseSound=new Audio("expense.mp3")
const inDetSound=new Audio("Income details.wav")
const exDetSound=new Audio("Expense details.wav")
const error=new Audio("Error.mp3");


//Summary 
const summaryIncome=document.getElementById("totalIncome")
const summaryExpense=document.getElementById("totalExpense")
const summaryBalance=document.getElementById("balanceAmt")

let totalIncome=0;
let incomeNo=1;
let expenseNo=1;
let totalExpense=0;

function addIncome(){


    let incomeValue=incomeAdder.value;
    let incomeAmount=parseFloat(incomeValue)
    totalIncome+=incomeAmount
    incomeInput.innerText=totalIncome
    

    let incomeSource=incomeSrc.value;
    let incomeDates=incomeDate.value;
    let incomeNotes=incomeNote.value;


    let table=document.getElementById("incomeTable");

    let tableRow=table.insertRow();

    let cell1=tableRow.insertCell(0);
    let cell2=tableRow.insertCell(1);
    let cell3=tableRow.insertCell(2);
    let cell4=tableRow.insertCell(3);
    let cell5=tableRow.insertCell(4);

    cell1.innerText=incomeNo;
    cell2.innerText=incomeSource
    cell3.innerText=incomeDates;
    cell4.innerText=incomeNotes
    cell5.innerText=incomeValue;

    incomeNo++;

    incomeSrc.value="";
    incomeDate.value="";
    incomeNote.value="";
    incomeAdder.value="";

    incomeSound.play();
    summaryDetails();

    document.getElementById("incomeDetailsBtn").disabled=false;

}

function calculateExpense(){

    let expValue=expAmt.value;
    let expenseAmt=parseFloat(expValue)
    totalExpense+=expenseAmt;
    exp.innerText=totalExpense;
    
    let expDate=dateAdder.value
    let payee=payeeName.value
    let expenseCategory=expCategory.options[expCategory.selectedIndex].text;
    let expenseAmount=expAmt.value

    let table=document.getElementById("expenseTable")

    let tableRow=table.insertRow();

    let cell1=tableRow.insertCell(0);
    let cell2=tableRow.insertCell(1);
    let cell3=tableRow.insertCell(2);
    let cell4=tableRow.insertCell(3);
    let cell5=tableRow.insertCell(4);

    cell1.innerText=expenseNo
    cell2.innerText=expDate
    cell3.innerText=payee
    cell4.innerText=expenseCategory
    cell5.innerText=expenseAmount

    expenseNo++;

    dateAdder.value="";
    payeeName.value="";
    expCategory.value="";
    expAmt.value=""

    expenseSound.play();
    summaryDetails();

    document.getElementById("expenseDetailsBtn").disabled=false;

}

function showDetails(type){

const incomeSection=document.getElementById("income-details")
const expenseSection=document.getElementById("expense-details")

if(type==="income"){
    incomeSection.style.display="block";
    expenseSection.style.display="none"
    inDetSound.play();
}
else if(type==="expense"){
    incomeSection.style.display="none"
    expenseSection.style.display="block"
    exDetSound.play()
}
}

function validateIncomeForm(){

    const source=incomeSrc.value.trim();
    const date=incomeDate.value.trim();
    const notes=incomeNote.value.trim();
    const amount=incomeAdder.value.trim();
    const warning=document.getElementById("incomeWarning");

    if(source===""||date===""||notes===""||amount===""){
        warning.style.display="block";
        error.play();

        setTimeout(()=>{
            warning.style.display="none";

        },3000)
        return false;
    }
    else{

        warning.style.display="none"
        addIncome();
    }


}

function validateExpenseForm(){
    
    const date=dateAdder.value.trim();
    const payeee=payeeName.value.trim();
    const category=expCategory.value.trim();
    const amount=expAmt.value.trim();
    const warning=document.getElementById("expenseWarning");
    const balanceWarning=document.getElementById("balanceWarning")

    if(date===""|| payeee===""|| category===""||amount===""){
        warning.style.display="block";
        error.play();

        setTimeout(()=>{
            warning.style.display="none";
            
        },3000);
        return false;
    }
    else{

        warning.style.display="none";

        if(totalIncome===0){

            balanceWarning.style.display="block";

            setTimeout(()=>{
                balanceWarning.style.display="none";

            },3000)
        }

        else{

            calculateExpense();

        }
    }
}


function summaryDetails() {
    summaryIncome.style.display = "none";
    summaryExpense.style.display = "none";

    let balanceAmount = totalIncome - totalExpense;
    summaryBalance.style.display = "block";
    summaryBalance.innerText = "💰 Balance: ₹" + balanceAmount;
}
