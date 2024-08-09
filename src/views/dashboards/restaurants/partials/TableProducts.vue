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

          <div class="flex">
            <div>
              <AddNewProduct v-model:visible="newProductDialog"/>
              <Button
                label="New"
                icon="pi pi-plus"
                severity="success"
                class="mr-2"
                @click="newProductDialog = true"
                size="small"
              />
            </div>
            
            <div>
              <EditProductDialog
                v-model:visible="editProductDialog"
              />
              <Button
                :disabled="!selectedProduct"
                label="Edit"
                icon="pi pi-pencil"
                severity="info"
                class="mr-2"
                @click="editProductDialog = true"
                size="small"
              />
            </div>

            <DeleteProductConfirm v-model="selectedProduct"/>
          </div>

          <div class="flex items-center gap-3">
            <div>
              <IconField>
                <InputIcon class="pi pi-search"></InputIcon>
                <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
              </IconField>
            </div>
            <div>
              <Button icon="pi pi-filter-slash" label="Clear" size="small" outlined @click="clearFilter()" />
            </div>
          </div>
        </div>
      </template>
      <template #empty> No products found. </template>
      <template #loading> Loading products data. Please wait. </template>
      <Column field="id" header="ID" sortable></Column>
      <Column field="name" header="Name" sortable></Column>
      <Column field="price" header="Price" sortable></Column>
      <Column field="image" header="">
        <template #body="slotProps">
          <img :src="`${apiUrl}/storage/images/products/${slotProps.data.image}`" :alt="slotProps.data.image" class="rounded" style="width: 64px" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { useStore } from '@/store/store';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { provide, ref } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import AddNewProduct from '@/components/dialogs/AddNewProduct.vue';
import DeleteProductConfirm from '@/components/dialogs/DeleteProductConfirm.vue';
import EditProductDialog from '@/components/dialogs/EditProductDialog.vue';

const store = useStore()
const selectedProduct = ref(null);
const newProductDialog = ref(false);
const editProductDialog = ref(false);
const apiUrl = import.meta.env.VITE_API_URL

const props = defineProps({
  products: Object
})

provide('selectedProduct', selectedProduct)

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

</script>