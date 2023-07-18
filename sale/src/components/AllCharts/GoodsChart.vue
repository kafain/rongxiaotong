<template>
  <div id="GoodsChart"></div>
</template>


<script type="text/javascript">
import * as echarts from 'echarts';
import {getGoodsOrderPrices} from '@/api/order'
export default {
  name: "GoodsChart",
  data(){
    return{
      data:[]
    }
  },
  methods:{
    async fetchData() {
      try {
        const response = await getGoodsOrderPrices();
        this.data = response;
        this.initReports();
      } catch (error) {
        console.log(error);
      }
    },
      initReports() {
        const counts = [0, 0, 0, 0, 0, 0];
        console.log(this.data);
        for (let i = 0; i < this.data.length; i++) {
         const price = this.data[i];
         if (price >= 0 && price < 20) {
           counts[0]++;
         } else if (price >= 20 && price < 40) {
           counts[1]++;
         } else if (price >= 40 && price < 60) {
           counts[2]++;
         } else if (price >= 60 && price < 80) {
           counts[3]++;
         } else if (price >= 80 && price < 100) {
           counts[4]++;
         } else if (price >= 100) {
           counts[5]++;
         }
       }

       const intervals = ['0-20', '20-40', '40-60', '60-80', '80-100', '100以上'];
       var myChart = echarts.init(document.getElementById('GoodsChart'), null, {
         width: 600,
         height: 400
       });
       const option = {
         color: [
           '#dd6b66',
           '#759aa0',
           '#e69d87',
           '#8dc1a9',
           '#ea7e53',
           '#eedd78',
           '#73a373',
           '#73b9bc',
           '#7289ab',
           '#91ca8c',
           '#f49f42'
         ],
         xAxis: {
           type: 'category',
           data: intervals
         },
         yAxis: {
           type: 'value'
         },
         series: [{
           data: counts,
           type: 'bar'
         }]
       };
       myChart.setOption(option);
     }
  },

  mounted() {
    this.initReports()
    this.fetchData()
  }
}

</script>

<style scoped>

</style>