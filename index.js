import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import {getDatabase, ref, push, onValue, remove} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
    databaseURL: 'https://todolist-98afa-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, 'shoppingList')

const addButtonEL = document.getElementById('add-button')
const inputFieldEl = document.getElementById('input-field')
const shoppingListEl = document.getElementById('shopping-list')

addButtonEL.addEventListener('click', () => {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    clearInputFieldEl()
})

onValue(shoppingListInDB, (snapshot) => {

    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())

        clearShoppingListEl()

        for (let i = 0; i < itemsArray.length; i++) {
            let currentItems = itemsArray[i]
            let currentItemsID = currentItems[0]
            let currentItemsValue = currentItems[1]
    
            printItem(currentItems)
        }
    }else{
        shoppingListEl.innerHTML = 'No items here... yet'
    }
    
})

const clearShoppingListEl = () => {
    shoppingListEl.innerHTML = ''
}

// RESET INPUT AFTER SUBMIT
const clearInputFieldEl = () =>{
    inputFieldEl.value = ''
}

// PRINT ITEM 
const printItem = (item) => {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement('li')

    newEl.textContent = itemValue

    newEl.addEventListener('click', () => {
        let exactLocarionOfItemInDB = ref(database, `shoppingList/${itemID}`)
        console.log(exactLocarionOfItemInDB)
        remove(exactLocarionOfItemInDB)
    })

    shoppingListEl.append(newEl)
}


