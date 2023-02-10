export default {
  props: ["page","getData"],
  template: `<nav aria-label="Page navigation" class="mt-5">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{disabled:page.has_pre?false:true}">
        <a class="page-link" href="#" aria-label="Previous" @click.prevent="getData(page.current_page-1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" v-for="pages in page.total_pages" :key=page
      :class="{active:pages === page.current_page?true:false}" >
      <a class="page-link" href="#" @click.prevent="getData(pages)">{{pages}}</a></li>
      <li class="page-item" :class="{disabled:page.has_next?false:true}">
        <a class="page-link" href="#" aria-label="Next" @click.prevent="$emit('next-page',page.current_page+1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`,
};
