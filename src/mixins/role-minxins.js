export default {
    data() {
        const meta = this.$router.currentRoute.meta;
        return {
            meta,
            btnPower: {name: 'establish', power: meta}
        };
    }
}