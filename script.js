"use strict";

const timerWrapper = document.querySelector('.timer__count');
const controlPriorityKey = 'controlPriority';
const timerCountKey = 'timerCount';
const controlPriority = getFromLocal(controlPriorityKey);
const newPriority = controlPriority ? controlPriority + 1 : 1;

sessionStorage.setItem(controlPriorityKey, newPriority);
localStorage.setItem(controlPriorityKey, newPriority);

function getFromLocal(key) {
    let data = localStorage.getItem(key);

    if (data) {
        return JSON.parse(data);
    }

    return data;
}

function showCount() {
    timerWrapper.innerHTML = getFromLocal(timerCountKey);
}

function setCount() {
    const count = prompt("Set the Count", 50);

    localStorage.setItem(timerCountKey, count);
}

function countDown() {
    let count = getFromLocal(timerCountKey);
    count--;
    localStorage.setItem(timerCountKey, count);
}

if (!localStorage.getItem(timerCountKey)) {
    setCount();
}

if(newPriority === 1) {
    const intervalId = setInterval(()=>{
        if (getFromLocal(timerCountKey) <= 1) {
            setCount();
        }
        else {
            countDown();
            showCount();
        }
    }, 1000)

    window.addEventListener("beforeunload", () => {
        localStorage.removeItem(controlPriorityKey);
    })
}


window.addEventListener("storage", showCount);


