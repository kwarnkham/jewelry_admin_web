<template>
  <q-page class="row justify-center">
    <div class="col-xs-12 col-sm-8">
      <q-form class="q-pa-sm" @submit.prevent="onSubmit" ref="addItemForm">
        <q-input
          autofocus
          label="Name"
          outlined
          v-model="name"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          lazy-rules
        />
        <q-input
          label="Price"
          type="number"
          outlined
          v-model="price"
          :rules="[ val => val && val.length > 0 || 'Please type something', val =>  val && val > 0|| 'Cannot be negative',]"
          lazy-rules
        />
        <q-input
          label="Description"
          outlined
          autogrow
          clearable
          v-model="description"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
          lazy-rules
        />
        <q-select
          :rules="[ val => val!= null || 'Please choose something' ]"
          label="Categories"
          multiple
          v-model="categories"
          :options="categoryOptions"
          outlined
          option-label="name"
          option-value="id"
        >
          <template v-slot:append>
            <q-btn round dense flat icon="add" @click.stop="showAddCategory" />
          </template>
        </q-select>
        <q-select
          :rules="[ val => val!= null || 'Please choose something' ]"
          label="Jewel Types"
          multiple
          v-model="jewelTypes"
          :options="jewelTypesOptions"
          outlined
          option-label="name"
          option-value="id"
        >
          <template v-slot:append>
            <q-btn round dense flat icon="add" @click.stop="showAddJewelType" />
          </template>
        </q-select>
        <div class="text-right">
          <q-btn label="Add" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { itemRelatedApi } from "../mixins/itemRelatedApi";
export default {
  name: "AddItem",
  mixins: [itemRelatedApi],
  data() {
    return {
      name: null,
      price: null,
      description: null,
      categories: null,
      jewelTypes: null
    };
  },
  computed: {
    categoryOptions() {
      return this.$store.state.categories;
    },
    jewelTypesOptions() {
      return this.$store.state.jewelTypes;
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.addItemForm.validate()) {
        let item = {
          name: this.name,
          price: this.price,
          description: this.description,
          categories: this.categories.map(category => category.id),
          jewel_types: this.jewelTypes.map(jewelType => jewelType.id)
        };
        this.addItem(item).then(response => {
          if (response != null) {
            this.resetForm();
            this.$refs.addItemForm.resetValidation();
          }
        });
      }
    },
    resetForm() {
      this.name = null;
      this.price = null;
      this.description = null;
      this.categories = [];
      this.jewelTypes = [];
    },
    showAddCategory() {
      this.$q
        .dialog({
          title: "Add Category",
          message: "Enter Category Name",
          prompt: {
            type: "text"
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => this.addCategory(data));
    },
    showAddJewelType() {
      this.$q
        .dialog({
          title: "Add Category",
          message: "Enter Category Name",
          prompt: {
            type: "text"
          },
          cancel: true,
          persistent: true
        })
        .onOk(data => this.addJewelType(data));
    }
  },
  created() {
    this.getCategories();
    this.getJewelTypes();
  }
};
</script>
