/** Modal box*/
var addbtn=document.querySelector(".add-btn");
var modal=document.querySelector('.modal');
var closebtn= document.querySelector('.close-icon');
addbtn.onclick = ()=>{
    modal.classList.add('active');
}

closebtn.addEventListener('click',()=>{
    modal.classList.remove('active')
})
/* Register button*/
var userData=[];
var idvar=document.getElementById('id');
var namevar=document.getElementById('name');
var lastnamevar=document.getElementById('last-name');
var emailvar=document.getElementById('e-mail');
var officevar=document.getElementById('office-code');
var jobtitlevar=document.getElementById('job-title');


var updatevar= document.querySelector('.update-btn');
var registervar= document.querySelector('.register-btn');
var registerForm = document.querySelector('#register-form');
var imgUrl;

registervar.onclick=function(e){
    e.preventDefault();
    registrationData();
    getDataFromLocal();
    registerForm.reset();
    closebtn.click();
};

/** Khi click vào thì lần lượt chạy những thao tác theo thứ tự như trên
 * Viết hàm cho từng funcition
 */

if(localStorage.getItem('userData') !=null){
userData=JSON.parse(localStorage.getItem('userData'));
console.log(userData);
}
/** 
 */

function registrationData(){
    userData.push({
        id: idvar.value,
        name: namevar.value,
        last_name: lastnamevar.value,
        email: emailvar.value,
        office_code: officevar.value,
        jobtitle : jobtitlevar.value,
        profilePic: profile_Pic.src== undefined ? 'avatar.png': profile_Pic.src
    });
    var userString = JSON.stringify(userData);
/** Trả về 1 chuỗi string */
    localStorage.setItem('userData',userString);
    swal("Good job!", "You clicked the button!", "success");
};

/** Trả dữ liệu vào bảng tính 
 * setItem():  localStorage.setItem('key', 'value')
 
LocalStorage chỉ cho phép chúng ta lưu biến với kiểu String
Dữ liệu phía trên có dạng String vì vậy
khi lưu vào localstoreage có dạng
localStorage.setItem('userData',userString) 

Key: userData
Value: id,name,last_name, email, office_code, jobtitle, profilePic
Nếu nhập lần 2
Key:userData
Value:[{ id,name,last_name, email, office_code, jobtitle, profilePic},{ id,name,last_name, email, office_code, jobtitle, profilePic}]


Object==>JSON.stringify==>JSON.parse==>Object

*/


/**parentElement trong javascript, 
 * qua đó sẽ giúp bạn lấy được thẻ html parent của thẻ html hiện tại. */

/**
 * Get data về bảng
 * userData.forEach (userDAta lúc này là array nên dùng hàm forEach)
 * userData.forEach((data,index)
 * ==> Data là 1 chuỗi [{ id,name,last_name, email, office_code, jobtitle, profilePic}]
 * 
 */



var tableData=document.querySelector('#table-data')
const getDataFromLocal =()=>{
    tableData.innerHTML='';
    userData.forEach((data,index)=>{
        tableData.innerHTML +=`
    <tr index='${index}'>
        <td>${index+1}</td>
        <td><img src="${data.profilePic}" width='40' height='40'></td>
        <td>${data.id}</td>
        <td>${data.name}</td>
        <td>${data.last_name}</td>
        <td>${data.email}</td>
        <td>${data.office_code}</td>
        <td>${data.jobtitle}</td>
        <td>
            <button class='edit-btn'><i class="fa fa-eye"></i></button>
            <button class="del-btn"><i class="fa fa-trash"></i></button>
        </td>
    </tr>
    `
    });

    /** Delete nút */
var i;
var allDelBtn = document.querySelectorAll('.del-btn');
for(i=0; i<allDelBtn.length;i++){
    allDelBtn[i].onclick = function(){
        var tr=this.parentElement.parentElement;
        var id=tr.getAttribute('index');
        userData.splice(id,1);
        localStorage.setItem('userData',JSON.stringify(userData));
        tr.remove();

    };
};

/**  Chức năng xem lại thông tin, và upload lại thông tin*/
var allEdit= document.querySelectorAll('.edit-btn');
for(i=0; i<allEdit.length;i++){
    allEdit[i].onclick=function(){
        var tr=this.parentElement.parentElement;
        var td = tr.getElementsByTagName('td');/*ra 9 mục của 1 td: id, name,lastname.....*/
        var index =tr.getAttribute('index');
        var imgTag = td[1].getElementsByTagName('img');
        var profilePic = imgTag[0].src;
        var id=td[2].innerHTML;
        var name = td[3].innerHTML;
        var last_name=td[4].innerHTML;
        var email = td[5].innerHTML;
        var office_code=td[6].innerHTML;
        var jobtitle = td[7].innerHTML;
        addbtn.click();
        registervar.disabled = true;
        updatevar.disabled=false;
        idvar.value=id;
        namevar.value=name;
        lastnamevar.value=last_name;
        emailvar.value=email;
        officevar.value= office_code;
        jobtitlevar.value=jobtitle;
        profile_Pic.src=profilePic;
        updatevar.onclick= function(e){
            userData[index] = {
                id: idvar.value,
                name: namevar.value,
                last_name: lastnamevar.value,
                email: emailvar.value,
                office_code: officevar.value,
                jobtitle : jobtitlevar.value,
                profilePic: profile_Pic.src == undefined ? 'avatar.png': profile_Pic.src
            };
            localStorage.setItem('userData', JSON.stringify(userData));
        };
    };
}

}
getDataFromLocal();

/** Lấy hình ảnh */
var profile_Pic=document.querySelector('#profile-pic');
var uploadPic=document.querySelector('#upload-file');
    uploadPic.onchange=function(){
        if(uploadPic.files[0].size < 1000000){
            var fReader= new FileReader();
            fReader.onload = function(){
                var imgUrl=fReader.result;
                profile_Pic.src=imgUrl;
                console.log(imgUrl);
            }
            fReader.readAsDataURL(uploadPic.files[0]);

        }
        else{
            alert('file is too big')
        }
    }
/**gán onchange vào element chứa type='file'
 * Khi bấm change vào mục file thì thực hiện function;
 * var 1 biến gán biến đó với file reader. Ý nghĩa: Biến này có thể đọc file
 -------const reader = new FileReader();-----
 * load vào biến đó sau khi có file qua onload
--------reader.addEventListener('load',() -------------------------
 * đồng thời chạy 1 function để cho ra kết quả uploaded_image = reader.result;
 * 
 * Và hiển thị lên hình vuông hiển thị bằng hàm style		
document.querySelector('#display_image'). style.backgroundImage=`url(${uploaded_image})`;
document.querySelector('#display_image'). style.backgroundSize = 'cover';
Cuối cùng dùng readAsDataURL
 */



/**  Chức năng xem lại thông tin, và upload lại thông tin*/

/** Chức năng search */
var searchvar = document.querySelector("#empty");
searchvar.oninput = function(){seachFunc();}
function seachFunc(){
    var tr = tableData.querySelectorAll('tr');
    var filter = searchvar.value.toLowerCase();
    var i;
    for (i=0; i<tr.length; i++){
        var td = tr[i].getElementsByTagName('td')[2];
        var id = td.innerHTML;
        if(id.toLowerCase().indexOf(filter)> -1){
            tr[i].style.display = ""
        }
        else{
            tr[i].style.display = "none"
        }
    }
}

/** Hàm Indexof 
 * array_name.indexOf(item, start_position);
 * var donut_flavors = ['Jam', 'Blueberry', 'Cinnamon', 'Apple Crumble', 'Frosted'];
console.log(donut_flavors.indexOf('Cinnamon'));
trả về kết quả là 2
Nếu xuất hiện nhiều hơn một Cinnamon thì hàm indexOf() chỉ trả về vị trí đầu tiên mà nó tìm thấy.
Có thể bắt đầu vị trí khác từ đầu với tham số start_position;
Trả về -1 nếu không tìm thấy gì
 toLowerCase() dùng để chuyển đổi tất cả các ký tự trong một chuỗi về dạng chữ thường
*/
