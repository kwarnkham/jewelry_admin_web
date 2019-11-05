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
                if (response.data.code == '0') {
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

            return res
        },

        async addItem(item) {
            let res = null
            this.$q.loading.show()
            let formData = new FormData();
            for (var i = 0; i < item.files.length; i++) {
                let file = item.files[i];
                formData.append("files[" + i + "]", file);
            }
            for (var i = 0; i < item.categories.length; i++) {
                let category = item.categories[i];
                formData.append("categories[" + i + "]", category);
            }
            for (var i = 0; i < item.jewel_types.length; i++) {
                let jewel_type = item.jewel_types[i];
                formData.append("jewel_types[" + i + "]", jewel_type);
            }

            formData.set('name', item.name)
            formData.set('price', item.price)
            formData.set('description', item.description)

            await axios({
                method: 'post',
                url: '/item',
                headers: { "Content-Type": "multipart/form-data" },
                data: formData
            }).then(response => {
                this.$q.loading.hide()
                if (response.data.code == '0') {
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
        },

        async getFactor() {
            let res = null
            this.$q.loading.show()
            axios({
                method: 'get',
                url: '/usdFactor'
            }).then(response => {
                this.$q.loading.hide()
                if (response.data.code == '0') {
                    res = response
                    this.$store.dispatch('setFactor', response.data.result.factor)
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
