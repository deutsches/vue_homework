const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

import productModal from "../component/productModal.js";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

loadLocaleFromURL(
  "https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json"
);
configure({
  generateMessage: localize("zh_TW"),
});

const app = Vue.createApp({
  data() {
    return {
      api_url: "https://vue3-course-api.hexschool.io",
      api_path: "uaena",
      // 產品列表
      products: [],
      cartList: [],
      product:{},
      isLoading: false,
      fullPage: true,
      totalPrice: 0,
      form: {
        user: {
          name: "",
          tel: "",
          email: "",
          address: "",
        },
        message: "",
      },
      loadingStatus: {
        loadingItem: '',
      },
    };
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage: ErrorMessage,
    productModal
  },
  methods: {
    //取得商品
    getData() {
      axios
        //.get(`${this.api_url}/v2/api/${this.api_path}/products/?page=${page}`)
        .get(`${this.api_url}/v2/api/${this.api_path}/products/all`)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
          }
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    //加入購物車
    addCart(productID,qty=1) {
        this.isLoading = true;
      const data = {
        product_id: productID,
        qty: qty,
      };
      axios
        .post(`${this.api_url}/v2/api/${this.api_path}/cart`, { data })
        .then((res) => {
          if (res.data.success) {
            this.isLoading = false;
            alert(res.data.message);
            this.renderCart();
            this.$refs.productModal.closeModal();
          }
        })
        .catch((err) => {
            this.isLoading = false;
          alert(err.data.message);
        });
    },
    // 取得購物車內容
    renderCart() {
      axios
        .get(`${this.api_url}/v2/api/${this.api_path}/cart`)
        .then((res) => {
          if (res.data.success) {
            this.cartList = res.data.data.carts;
            this.totalPrice = res.data.data.final_total;
          }
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    //更改購物車數量
    editQty(cart) {
      const data = {
        product_id: cart.product_id,
        qty: cart.qty,
      };
      console.log(data);
      axios
        .put(`${this.api_url}/v2/api/${this.api_path}/cart/${cart.id}`, {
          data,
        })
        .then((res) => {
          if (res.data.success) {
            this.renderCart();
          }
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    //刪除單一購物車
    removeCartItem(cart_id) {
      this.loadingStatus.loadingItem = cart_id;
      axios
        .delete(`${this.api_url}/v2/api/${this.api_path}/cart/${cart_id}`)
        .then((res) => {
          if (res.data.success) {
            this.loadingStatus.loadingItem = '';
            this.renderCart();
          }
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    // 刪除全部購物車
    removeAllCart() {
      axios
        .delete(`${this.api_url}/v2/api/${this.api_path}/carts`)
        .then((res) => {
          if (res.data.success) {
            alert(`購物車${res.data.message}!`);
            this.renderCart();
          }
        })
        .catch((err) => {
          alert(err.data.message);
        });
      // axios
      //     .get(`${this.api_url}/v2/api/${this.api_path}/orders`,)
      //     .then((res) => {
      //         console.log(res);
      //       if (res.data.success) {

      //       }
      //     })
      //     .catch((err) => {

      //       alert(err.data.message);
      //     });
    },
    //送出訂單
    createOrder() {
      if (!this.cartList) {
        this.isLoading = true;
        axios
          .post(`${this.api_url}/v2/api/${this.api_path}/order`, {
            data: this.form,
          })
          .then((res) => {
            
            if (res.data.success) {
              this.isLoading = false;
              alert(res.data.message);
              this.refs.form.resetForm();
              this.renderCart();
            }
          })
          .catch((err) => {
            alert(err.data.message);
          });
      } else {
        alert("請至少加入一項產品至購物車!");
      }
    },
    //千分位
    moneyFormat(money) {
      return money.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    },
    openModal(product){
        this.product = product;
        
        this.$refs.productModal.openModal();
    },
    /*
    addLoading() {
      // #1 作為元件呼叫
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },*/
  },
  mounted() {
    this.getData();
    this.renderCart();
  },
});

//app.use(VueLoading.Plugin); // 作為套件引用
app.component("loading", VueLoading.Component);
//app.component("productModal",productModal)

app.mount("#app");
