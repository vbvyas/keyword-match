const app = new Vue({
    el: '#app',
    data: {
        app: {
            text1: '',
            text2: '',
            keywords: []
        }
    },
    methods: {
        submit: function (event) {
            event.preventDefault()
            if (this.app.text1 && this.app.text2) {
                $.post('/', { text1: this.app.text1, text2: this.app.text2 }, (data) => {
                    if (data) {
                        this.app.keywords = data
                    }
                })
            }
        }
    }
})