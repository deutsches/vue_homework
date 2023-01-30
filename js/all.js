

const app = Vue.createApp({
  data() {
    return {
      url: "https://vue3-course-api.hexschool.io",
      api_path: "uaena",
      // 產品列表
      products: [],
      product: {},
    };
  },
  methods: {
    checkAdmin(){
      axios.post(`${this.url}/api/user/check`)
      .then(() => {
        this.getData();
      })
      .catch((err) => {
        alert(err.response.data.message)
        window.location = 'login.html';
      })
    },
    viewProduct(item) {
      this.product = item;
    },
    getData() {
       
      axios.get(`${this.url}/v2/api/${this.api_path}/admin/products/all`)
      .then((res) => {
        if (res.data.success) {
          this.products = res.data.products;
        }
        
      }).catch((err)=>{

      });
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    //axios設定header
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
  
  },
  
});

app.mount("#app");
