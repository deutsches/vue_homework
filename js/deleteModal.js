export default {
  data() {
    return {
      api_url: "https://vue3-course-api.hexschool.io",
      api_path: "uaena",
      deleteProductModal:null,
    };
  },
  mounted(){
    this.deleteProductModal = new bootstrap.Modal(
        document.getElementById("deleteProductModal"),
        {
          keyboard: false,
        }
      );
  },
  methods:{
    deleteProduct() {
        const url = `${this.api_url}/api/${this.api_path}/admin/product/${this.product.id}`;
        axios
          .delete(url)
          .then((response) => {
            alert(response.data.message);
            this.deleteProductModal.hide();
            this.$emit('saveProduct');
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      },
      openModal(){
        this.deleteProductModal.show();
      }
  },
  props: ["product"],
  template: `<div
    id="deleteProductModal"
    ref="deleteProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="deleteProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="deleteProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ product.title }}</strong>
          商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteProduct"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>`,
};
