<template>
  <q-page class="row justify-center">
    <q-card class="col-11 row q-ma-sm q-pa-sm" v-for="item in items" :key="item.id">
      <div class="col row items-center">
        <!-- {{item.images[0].name}} -->
        <q-img :src="`${$store.state.host}/storage/item_images/${item.images[0].name}`"></q-img>
      </div>
      <div class="col-5 bg-grey">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>Name</q-item-label>
              <q-item-label caption>{{item.name}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Price</q-item-label>
              <q-item-label caption v-if="!showPrice">
                <q-btn
                  @click="showPrice = !showPrice"
                  icon="attach_money"
                  rounded
                  no-caps
                  text-color="yellow"
                  glossy
                  color="indigo"
                />
              </q-item-label>
              <q-item-label caption v-if="showPrice">
                {{item.price * $store.state.factor.value}} MMK
                <span class="text-italic text-white">
                  {{new Date().toLocaleString()}}
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Description</q-item-label>
              <q-item-label caption>{{item.description}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Categories</q-item-label>
              <q-item-label caption>{{item.categories.map(category=>category.name).join(' ,')}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>Jewel Types</q-item-label>
              <q-item-label caption>{{item.jewel_types.map(type=>type.name).join(' ,')}}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { itemRelatedApi } from "../mixins/itemRelatedApi";
export default {
  name: "Items",
  mixins: [itemRelatedApi],
  data() {
    return {
      showPrice: false
    };
  },
  computed: {
    items() {
      return this.$store.state.items;
    }
  },
  methods: {},
  created() {}
};
</script>
