export default{
    template:"#product-modal-template",
    props:["product"],
    data(){
        return{
            productModal:null,
            qty:1,
        }
    },
    mounted(){
        this.productModal = new bootstrap.Modal(
            document.getElementById("productModal"),
            {
              keyboard: false,
            }
          );
    },
    
    methods:{
        openModal(){
            this.productModal.show();
        },
        closeModal(){
            this.productModal.hide();
        }
    }
}


