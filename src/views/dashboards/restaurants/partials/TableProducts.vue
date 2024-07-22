<template>
  <div class="p-3 mt-5 lg:mx-5 w-full rounded-lg" :class="store.sheet">
    <DataTable
      v-model:filters="filters"
      v-model:selection="selectedProduct"
      :value="props.products"
      paginator
      :rows="5"
      sortMode="multiple"
      :globalFilterFields="['name']"
      selectionMode="single"
    >
      <template #header>
        <div class="flex justify-between">

          <div>
            <AddNewProduct v-model:visible="newProductDialog"/>

            <Button label="New" icon="pi pi-plus" severity="success" class="mr-2" @click="newProductDialog = true" size="small"/>
            <Button label="Delete" icon="pi pi-trash" severity="danger" @click="confirmDeleteSelected" :disabled="!selectedProduct" size="small" outlined/>
          </div>

          <div class="flex gap-3">
            <IconField>
              <InputIcon class="pi pi-search"></InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
            </IconField>
            <Button icon="pi pi-filter-slash" label="Clear" size="small" outlined @click="clearFilter()" />
          </div>
        </div>
      </template>
      <template #empty> No products found. </template>
      <template #loading> Loading products data. Please wait. </template>
      <Column field="image" header=""></Column>
      <Column field="id" header="ID" sortable></Column>
      <Column field="name" header="Name" sortable></Column>
      <Column field="price" header="Price" sortable></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { useStore } from '@/store/store';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { ref } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import AddNewProduct from '@/components/dialogs/addNewProduct.vue';

const store = useStore()
const selectedProduct = ref(null);
const newProductDialog = ref(false);

const props = defineProps({
  products: Object
})

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  }
}

const clearFilter = () => {
  initFilters();
};

const confirmDeleteSelected = () => {}

</script>