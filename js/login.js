const app = Vue.createApp({
  data() {
    return {
      url: "https://vue3-course-api.hexschool.io",
      api_path: "uaena",
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
    
      const username = this.username;
      const password = this.password;
      const data = {
        username,
        password,
      };
      axios
        .post(`${this.url}/v2/admin/signin`, data) // 發出請求
        .then((res) => {
          if (res.data.success) {
            const { token, expired } = res.data;
           
            document.cookie = `hexToken=${token};expires=${new Date(
              expired
            )}; path=/`;
            window.location.href = "product.html";
          }
        }).catch((error)=>{
          alert(error.response.data.message);
        });
    },
  },
  mounted() {
   
  },
});

app.mount("#app");
