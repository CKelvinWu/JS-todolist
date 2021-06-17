let data = [
    {
        checked: false,
        todolist: 123
    },
    {
        checked: true,
        todolist: 456
    },
    {
        checked: false,
        todolist: 789
    }];
const btn_add = document.querySelector(".btn_add");
const btn_all = document.querySelector(".btn_all");
const btn_unfinished = document.querySelector(".btn_unfinished");
const btn_finished = document.querySelector(".btn_finished");
const todolist = document.querySelector(".todolist");
const filter = document.querySelector(".filter");
const unfinished_num = document.querySelector(".unfinished_num");
const input_list = document.querySelector(".input_list");
const clear_btn = document.querySelector(".clear_btn");




function calc_unfinished_num() {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        if (!data[i].checked) {
            sum++;
        }
    }
    unfinished_num.textContent = sum + "個待完成項目";
}

function render() {
    let str = "";
    //判斷cursor在哪
    data.forEach(function (item, index) {
        let content;
        if (data[index].checked) {
            content = `<li>
            <label data-num="${index}" ><input data-num="${index}" class="checkbox" type="checkbox" checked><span >✔</span>
            <p>${item.todolist}</p>
            </label><input class="delete" type="button" value="X"></li>`;
        } else {
            content = `<li>
            <label data-num="${index}"><input data-num="${index}" class="checkbox" type="checkbox"><span >✔</span>
            <p>${item.todolist}</p>
            </label><input class="delete" type="button" value="X"></li>`;
        }
        str += content
    })
    todolist.innerHTML = str;
    calc_unfinished_num()
    let cursor = filter.querySelector(".cursor");
    refresh_filter(cursor);
}

function calc_unfinished_num() {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        if (!data[i].checked) {
            sum++;
        }
    }
    unfinished_num.textContent = sum + "個待完成項目";
}

function refresh_filter(tag) {
    let check = todolist.querySelectorAll(".checkbox:checked");
    let uncheck = todolist.querySelectorAll(".checkbox:not(:checked)");
    let checkbox = todolist.querySelectorAll(".checkbox");

    if (tag.value === "已完成") {
        btn_unfinished.classList.remove("cursor");
        btn_all.classList.remove("cursor");
        for (let i = 0; i < data.length; i++) {
            if (data[i].checked) {
                checkbox[i].parentNode.parentNode.style.display = 'flex';
            } else {
                checkbox[i].parentNode.parentNode.style.display = 'none';
            }
        }
    } else if (tag.value === "待完成") {
        btn_all.classList.remove("cursor");
        btn_finished.classList.remove("cursor");
        for (let i = 0; i < data.length; i++) {
            if (data[i].checked) {
                checkbox[i].parentNode.parentNode.style.display = 'none';
            } else {
                checkbox[i].parentNode.parentNode.style.display = 'flex';
            }
        }

    } else {
        btn_finished.classList.remove("cursor");
        btn_unfinished.classList.remove("cursor");
        for (let i = 0; i < data.length; i++) {
            checkbox[i].parentNode.parentNode.style.display = 'flex';
        }
    }

}

render()

// check and uncheck 
todolist.addEventListener("click", function (e) {
    let num = e.target.dataset.num;
    let checkbox = todolist.querySelectorAll(".checkbox");
    if (e.target.nodeName !== "INPUT" || e.target.className === "delete") {
        return
    }
    // console.log(checkbox[num].checked);
    if (checkbox[num].checked) {
        data[num].checked = true;
    } else {
        data[num].checked = false;
    }
    calc_unfinished_num()
    let cursor = filter.querySelector(".cursor");
    refresh_filter(cursor);
})

// add new todolist
btn_add.addEventListener("click", function (e) {
    let content = input_list.value.trim();
    if (content === "") {
        return
    }
    data.push({
        checked: false,
        todolist: content
    });
    render()
    input_list.value = "";
})

input_list.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        btn_add.click();
    }
});


filter.addEventListener("click", function (e) {
    let check = todolist.querySelectorAll(".checkbox:checked");
    let uncheck = todolist.querySelectorAll(".checkbox:not(:checked)");
    let checkbox = todolist.querySelectorAll(".checkbox");
    e.target.classList.add("cursor");
    refresh_filter(e.target)

})

clear_btn.addEventListener("click", function (e) {
    data = [];
    render()
})


todolist.addEventListener("click", function (e) {
    if (e.target.className !== "delete") {
        return
    }
    let num = e.target.previousSibling.dataset.num;
    data.splice(num, 1);
    render()

})