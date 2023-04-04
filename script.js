var nameip = document.getElementById('name');
var emailip = document.getElementById('email');
var gpaip = document.getElementById('gpa');
var ageip = document.getElementById('age');
var degreeip = document.getElementById('degree');
var submitbtn = document.getElementById('btn');
var tablebox = document.getElementById('table-body');
var error = document.querySelector('#errormsg');
var search = document.getElementById('searchbar');
var searchbtn = document.getElementById('searchkey');


const studentDetails = [];


function validateDetails(e){
    if(nameip.value && emailip.value && gpaip.value && ageip.value && degreeip.value){
        error.classList.remove('errormsg')
        saveDetails();
        showDetails(e);
    }
    else{
        error.classList.add('errormsg');
    }
}


let saveDetails = () => {
    let entry = {
        name: nameip.value,
        email: emailip.value,
        gpa: gpaip.value,
        age: ageip.value,
        degree: degreeip.value
    }
    studentDetails.push(entry);
    localStorage.setItem('StudentEntries',JSON.stringify(studentDetails));
}


function showDetails(e){
    e.preventDefault();
    tablebox.innerHTML = '';
    let count = 0;
    studentDetails.map((entry)=> {
        return ( tablebox.innerHTML += `<tr id="${count}"><td class="search-values">${++count}</td><td class="search-values">${entry.name}</td><td class="search-values">${entry.email}</td><td class="search-values">${entry.gpa}</td><td class="search-values">${entry.age}</td><td class="search-values">${entry.degree}</td><td><span class="material-symbols-outlined" onclick = editEntry(this)>edit_square</span>&nbsp;&nbsp;<span class="material-symbols-outlined" onclick = deleteEntry(this)>delete</span></td></tr>`)
    })
    clearDetails();
}


function clearDetails(){
    nameip.value = '';
    emailip.value = '';
    gpaip.value = '';
    ageip.value = '';
    degreeip.value = '';
}


function editEntry(reference){
    var id = reference.parentElement.parentElement.id;
    nameip.value = studentDetails[id].name;
    emailip.value = studentDetails[id].email;
    gpaip.value = studentDetails[id].gpa;
    ageip.value = studentDetails[id].age;
    degreeip.value = studentDetails[id].degree;
    submitbtn.textContent = "Edit Student";
    deleteEntry(reference);
}


function deleteEntry(reference){
    reference.parentElement.parentElement.remove();
    studentDetails.splice(reference.parentElement.parentElement.id,1);
    localStorage.setItem('StudentEntries',JSON.stringify(studentDetails));
}


function searchEntries(){
    var filter, table, tr, td, i, txtValue;
    filter = search.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        names = tr[i].getElementsByTagName("td")[1];
        emails = tr[i].getElementsByTagName("td")[2];
        degrees = tr[i].getElementsByTagName("td")[5];
        if (names || emails || degrees) {
            namesValue = names.textContent || names.innerText;
            emailsValue = emails.textContent || emails.innerText;
            degreesValue = degrees.textContent || degrees.innerHTML;
            if (namesValue.toUpperCase().indexOf(filter) > -1 || emailsValue.toUpperCase().indexOf(filter) > -1 || degreesValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }       
    }
}


submitbtn.addEventListener('click',validateDetails);
searchbtn.addEventListener('click',searchEntries);