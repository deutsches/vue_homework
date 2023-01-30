let deleteProductModal = null;
let productModal = null;

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
    };
  },
  methods: {
    checkAdmin() {
      axios
        .post(`${this.api_url}/api/user/check`)
        .then((res) => {
          if(!res.data.success){
            window.location = "login.html";
          }
          this.getData();
        })
        .catch((err) => {
          alert(err.data.message);
          window.location = "login.html";
        });
    },
    getData() {
      axios
        .get(`${this.api_url}/v2/api/${this.api_path}/admin/products/all`)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
          }
        })
        .catch((err) => {
            alert(err.data.message);
        });
    },
    openModal(isNew, item) {
      if (isNew == "delete") {
        this.product = { ...item };
        deleteProductModal.show();
      } else if (isNew == "edit") {
        this.isNew = false;
        this.product = { ...item };
        productModal.show();
      } else if(isNew == "new"){
        this.isNew = true;
        this.product = {
            imagesUrl: [],
          };
        productModal.show();
      }
    },
    saveProduct(){
        let url = `${this.api_url}/api/${this.api_path}/admin/product`;
        let http = 'post';
        if(!this.isNew){
            url = `${this.api_url}/api/${this.api_path}/admin/product/${this.product.id}`;
            http = 'put'
        }
        axios[http](url, { data: this.product }).then((response) => {
            alert(response.data.message);
            productModal.hide();
            this.getData();
          }).catch((err) => {
            alert(err.response.data.message);
          });
        this.isNew = false;
    },
    deleteProduct(){
        const url = `${this.api_url}/api/${this.api_path}/admin/product/${this.product.id}`;
        axios.delete(url).then((response) => {
            alert(response.data.message);
            deleteProductModal.hide();
            this.getData();
          }).catch((err) => {
            alert(err.response.data.message);
          })
    }

  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    //axios設定header
    axios.defaults.headers.common.Authorization = token;
    this.checkAdmin();
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
       keyboard: false
    });

    deleteProductModal = new bootstrap.Modal(
      document.getElementById("deleteProductModal"),
      {
        keyboard: false,
      }
    );
  },
});

app.mount("#app");
