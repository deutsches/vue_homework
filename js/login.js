const url = "https://vue3-course-api.hexschool.io";
const path = "uaena";

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", login);

function login() {
  const username = document.getElementById("userName").value;
  const password = document.getElementById("password").value;
  const data = {
    username,
    password,
  };
 
  axios
    .post(`${url}/v2/admin/signin`, data) // 發出請求
    .then((res) => {
      console.log(res);
      if (res.data.success) {
        const { token, expired } = res.data;
        console.log(expired, new Date(expired));
        document.cookie = `hexToken=${token};expires=${new Date(
          expired
        )}; path=/`;
        console.log(window);
        //window.location.href ='ProductList.html';
      }
    });
    
}
