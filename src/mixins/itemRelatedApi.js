import axios from "axios";
import store from "../store/index";
axios.defaults.baseURL = store.state.host + '/api/';


export const itemRelatedApi = {
    created() {
        // console.log(this.$store.state.host);
    },
    methods: {
        async addCategory(categoryName) {
            let res = null
            this.$q.loading.show()

            await axios({
                method: 'post',
                url: '/category',
                data: {
                    name: categoryName
                }
            }).then(response => {
                this.$q.loading.hide()
                if (response.data.code == '0') {
                    res = response
                    this.$store.dispatch('addCategory', response.data.result.category)
                }
                if (response.data.code == '1') {
                    this.$q.notify({
                        message: response.data.msg,
                        closeBtn: 'Close'
                    })
                }
            })
            return res
        },

        async getCategories() {
            let res = null
            this.$q.loading.show()
            await axios({
                method: 'get',
                url: '/categories',
            }).then((response) => {
                this.$q.loading.hide();
                if (response.data.code == '0') {
                    res = response
                    this.$store.dispatch('setCategories', response.data.result.categories)
                }
                if (response.data.code == '1') {
                    this.$q.notify({
                        message: response.data.msg,
                        closeBtn: 'Close'
                    })
                }
            })
            return res
        },

        async addJewelType(typeName) {
            let res = null
            this.$q.loading.show()

            await axios({
                method: 'post',
                url: '/jewelType',
                data: {
                    name: typeName
                }
            }).then(response => {
                this.$q.loading.hide()
                if (response.data.code == '0') {
                    res = response
                    this.$store.dispatch('addJewelType', response.data.result.jewel_type)
                }
                if (response.data.code == '1') {
                    this.$q.notify({
                        message: response.data.msg,
                        closeBtn: 'Close'
                    })
                }
            })
            return res
        },


        async getJewelTypes() {
            let res = null
            this.$q.loading.show()
            await axios({
                method: 'get',
                url: '/jewelTypes',
            }).then((response) => {
                this.$q.loading.hide();
                if (response.data.code == '0') {
                    res = response
                    this.$store.dispatch('setJewelTypes', response.data.result.jewel_types)
                }
                if (response.data.code == '1') {
                    this.$q.notify({
                        message: response.data.msg,
                        closeBtn: 'Close'
                    })
                }
            })
            return res
        },

        async getItems() {
            let res = null
            this.$q.loading.show()
            await axios({
                method: 'get',
                url: '/items'
            }).then(response => {
                this.$q.loading.hide()
                if (response.data.code = '0') {
                    res = response
                    this.$store.dispatch('setItems', response.data.result.items)
                }
                if (response.data.code == '1') {
                    this.$q.notify({
                        message: response.data.msg,
                        closeBtn: 'Close'
                    })
                }
            })
        },

        async addItem(item) {
            let res = null
            this.$q.loading.show()
            await axios({
                method: 'post',
                url: '/item',
                data: item
            }).then(response => {
                this.$q.loading.hide()
                if (response.data.code = '0') {
                    res = response
                    this.$store.dispatch('addItem', response.data.result.item)
                }
                if (response.data.code == '1') {
                    this.$q.notify({
                        message: response.data.msg,
                        closeBtn: 'Close'
                    })
                }
            })
            return res
        }
    }
}
