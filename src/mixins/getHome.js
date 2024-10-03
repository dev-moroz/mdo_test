export default {
    data(){
        return{}
    },
    computed: {
        getFlats(){
            return this.$store.getters['request/getFlats']
        },
        getHomes(){
            return this.$store.getters['request/getHomes']
        },
    },
    methods: {
        setHome(homeId){
            return this.$store.dispatch('request/setFlat', {homeId})
        }
    }
}