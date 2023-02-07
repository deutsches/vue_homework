//let deleteProductModal = null;
//let productModal = null;

import pagination from "./pagination.js";
import deleteModal from "./deleteModal.js";

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
    checkAdmin() {
      axios
        .post(`${this.api_url}/api/user/check`)
        .then((res) => {
          if (!res.data.success) {
            window.location = "login.html";
          }
          this.getData();
        })
        .catch((err) => {
          alert(err.data);
          window.location = "login.html";
        });
    },
    getData(page=1) {
      axios
        .get(`${this.api_url}/v2/api/${this.api_path}/admin/products/?page=${page}`)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
            this.page = res.data.pagination;
          }
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    openModal(isNew, item) {
      if (isNew == "delete") {
        this.product = { ...item };
        this.$refs.deleteProductModal.openModal();
      } else if (isNew == "edit") {
        this.isNew = false;
        this.product = { ...item };
        this.$refs.productModal.openModal();
      } else if (isNew == "new") {
        this.isNew = true;
        this.product = {
          imagesUrl: [],
        };
        this.$refs.productModal.openModal();
      }
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
  components: {
    pagination,deleteModal
  },
});

// MODAL元件
app.component("product-modal", {
  props:["product",'isNew'],
  template: `#product-modal-template`,
  data(){
    return{
      api_url: "https://vue3-course-api.hexschool.io",
      api_path: "uaena",
      productModal:null,
    }
  },
  methods:{
    createImages() {
      if(!this.product.imagesUrl ){
        this.product.imagesUrl = [];
        this.product.imagesUrl.push('');
      }else{
        this.product.imagesUrl.push('');
      }
    },
    openModal(){
      this.productModal.show();
    },
    saveProduct() {
      let url = `${this.api_url}/api/${this.api_path}/admin/product`;
      let http = "post";
      if (!this.isNew) {
        url = `${this.api_url}/api/${this.api_path}/admin/product/${this.product.id}`;
        http = "put";
      }
      axios[http](url, { data: this.product })
        .then((response) => {
          if(response.data.success){
            this.$emit('saveProduct');
            this.productModal.hide();
          }
          else{
            alert(response.data.message);
          }
        })
        .catch((err) => {
          alert(err.data.message);
        });
     
    },

  },
  mounted(){
    this.productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false,
      //backdrop: 'static'
    });


  }
});

app.mount("#app");
