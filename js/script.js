		// get the heading element
			const headingEl = document.querySelector('#headingTotal');
			// get the reference to desc element
			const inputDescEl = document.querySelector('#inputDesc');
			// ref to input amount
			const inputElement = document.querySelector('#inputAmount');
			// get the ref to table
			const expenseTableEl = document.querySelector('#expenseTable');
			// init value of expense at 0
			let totalExpense = 0;
			// set the heading element to total Expense
			headingEl.textContent = totalExpense;
			// allExpenses at one place
		var  allExpenses = [];
            
		
			// onButtonClick add inputAmount to totalExpense
			function addExpenseToTotal() {
				var expenseItem = {};
				// read value from inputAmount
				const textAmount = inputElement.value;
				// read the desc from inputDesc
				const textDesc = inputDescEl.value;
				// convert it to number
				const expense = parseInt(textAmount, 10);
				// put it in object
				expenseItem.desc = textDesc;
				expenseItem.amount = expense;
				expenseItem.moment = new Date();
				allExpenses.push(expenseItem);
				// add that value to totalExpense
				totalExpense = totalExpense + expense;
			        // set the heading element to totalExpense
                   uppo();
            renderList(allExpenses);
           inputElement.value = "";
            inputDescEl.value = "";
        }


        function uppo() {
            var someText = `Total: ${totalExpense}`;
            headingEl.textContent = someText;
            
        }
        // getting the btn element
        const element = document.querySelector('#btnAddExpense');
        // Listening to click event
        element.addEventListener('click', addExpenseToTotal, false);
        // Controller Functions
        // Get Date String
        function getDateString(momento) {
            return momento.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        }
     
        // Delete Items
        function deleteItem(dateValue, amount) {
           
            const newArr = allExpenses.filter(expense => expense.moment.valueOf() !== dateValue);          
            allExpenses = [...newArr];
            renderList(newArr);
            totalExpense -= amount;
			uppo();
			alert("Expense Removed!!");
   
        }

  



        // View Layer
        function renderList(arrOfList) {
            const allExpenseHTML = arrOfList.map(expense => createListItem(expense));
            const joinedAllExpenseHTML = allExpenseHTML.join('');
            expenseTableEl.innerHTML = joinedAllExpenseHTML;
        }
			function createListItem({ desc, amount, moment }) {
				return `
                    <li class="list-group-item d-flex justify-content-between">
							<div class="d-flex flex-column">
								${desc}
								<small class="text-muted">${getDateString(moment)}</small>
							</div>
							<div>
								<span class="px-5">
									${amount}
								</span>
								<button 
                                    type="button" 
                                    class="btn btn-outline-danger rto  btn-sm" 
                                   
                                    onclick="deleteItem(${moment.valueOf()}, ${amount})"
                                    >
									<i class="fas fa-trash-alt"></i>
								</button>
							</div>
						</li>
                    `;
			}