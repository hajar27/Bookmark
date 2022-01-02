//elements

var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl")
var table = document.querySelector(".table-toggle");

//arr & local storage
var arr;

if (localStorage.getItem("site")) {
    arr = JSON.parse(localStorage.getItem("site"))
    display(arr)
}

else
    arr = []


// toggle table (display data)

function toggleTable() {
    if (arr.length <= 0)
        table.style.display = "none"
    else
        table.style.display = "block"
}
toggleTable()

//add Fun

function addBookMark() {

    if (checkEmpty() && nameRegex() && urlRegex() && urlUnique(validation_url()) != false) {
        var obj = {
            siteName: siteName.value,
            siteUrl: validation_url(),
        }

        arr.push(obj)
        display(arr)
        localStorage.setItem("site", JSON.stringify(arr))
        clear()
        toggleTable()
    }
    else {
        if (checkEmpty() == false)
            checkEmpty()
        if (nameRegex() == false)
            nameRegex()
        if (urlRegex() == false)
            urlRegex()
        if (urlUnique(validation_url()) == false)
            urlUnique(validation_url())
    }


}

//display Fun

function display(list) {
    var cartoona = "";

    for (var i = 0; i < list.length; i++) {
        cartoona += `<tr>
       <td>${list[i].siteName}</td>
       <td><a href="${list[i].siteUrl}" class="btn btn-info">visite</a></td>
       <td><button class="btn btn-danger" onclick="del(${i})">delete</button></td>
       </tr>`
    }
    document.getElementById("Row").innerHTML = cartoona
}


function validation_url() {
    if (siteUrl.value.indexOf("http") == -1 && siteUrl.value.indexOf("https") == -1)
        return "http://" + siteUrl.value
    else
        return siteUrl.value
}

function checkEmpty() {
    if (siteUrl.value == "" || siteName.value == "") {
        if (siteName.value == "") {
            siteName.nextElementSibling.style.opacity = 1;
            siteName.nextElementSibling.innerHTML = "name is empty"
        }

        if (siteUrl.value == "") {
            siteUrl.nextElementSibling.style.opacity = 1;
            siteUrl.nextElementSibling.innerHTML = "url is empty"
        }

        return false

    }

    return true
}

//clear Fun

function clear() {
    siteUrl.value = "";
    siteName.value = ""
}

//nameFormate Fun

function nameRegex() {
    if (siteName.value != "") {
        var regex = /[A-Z]{1}[a-z]{3,8}$/;
        if (regex.test(siteName.value))
            return true;
        else {
            siteName.nextElementSibling.style.opacity = 1;
            siteName.nextElementSibling.innerHTML = "name not match 'start with capital letter and write from 3-8 char'"
            return false;
        }
    }
}

//urlFormate Fun

function urlRegex() {
    if (siteUrl.value != "") {
        var regex = /(https:\/\/)?(www\.)[a-zA-Z0-9]{2,10}\.[a-z]{2,4}$/
        if (regex.test(siteUrl.value))
            return true
        else {
            siteUrl.nextElementSibling.style.opacity = 1;
            siteUrl.nextElementSibling.innerHTML = "url not match 'please put url in right form'"
            return false
        }
    }
}

//url unique

function urlUnique(url) {
console.log(url)
    if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].siteUrl === url) {
                siteUrl.nextElementSibling.style.opacity = 1;
                siteUrl.nextElementSibling.innerHTML = "url mogod"
                console.log("mogod")
                return false
            }

        }

    }

    if (arr.length === 0)
        return true

}

//delete Fun

function del(index) {
    arr.splice(index, 1)
    display(arr)
    localStorage.setItem("site", JSON.stringify(arr))
    toggleTable()
}


//hide alerts

siteName.addEventListener("keydown", function () {
    siteName.nextElementSibling.style.opacity = 0
})

siteUrl.addEventListener("keydown", function () {
    siteUrl.nextElementSibling.style.opacity = 0
})




