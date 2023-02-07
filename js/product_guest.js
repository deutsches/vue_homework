



const app = Vue.createApp({
  data() {
    return {
      api_url: "https://vue3-course-api.hexschool.io",
      api_path: "uaena",
      // 產品列表
      products: [],
      product: {
        imagesUrl: [],
      },
      isNew: false,
      page:{},
      
    };
  },
  methods: {
    getData(page=1) {
      axios
        //.get(`${this.api_url}/v2/api/${this.api_path}/products/?page=${page}`)
        .get(`${this.api_url}/v2/api/${this.api_path}/products/all`)
        .then((res) => {
            console.log(res)
          if (res.data.success) {
            
            this.products = res.data.products;
            this.page = res.data.pagination;
          }
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
   
   
    
  },
  mounted() {
    
    this.getData();
  },
});


app.mount("#app");
