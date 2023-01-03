const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

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
    viewProduct(item) {
      this.product = item;
    },
    getData() {
       
      axios.get(`${this.url}/v2/api/${this.api_path}/admin/products/all`, {
        headers: {
          Authorization: token,
        },
      }).then((res) => {
        if (res.data.success) {
          console.log(res);

          this.products = res.data.products;
        }
        
      }).catch((err)=>{
        console.log(err);
      });
    },
  },
  mounted() {
    this.getData();
  },
});

app.mount("#app");
