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
        this.data = await getGoodsOrderPrices();
        this.initReports();
      } catch (error) {
        console.log(error);
      }
    },
      initReports() {
        const counts = [0, 0, 0, 0, 0, 0];
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
         title:{
           text:'Price distribution of products',
           subtext: 'Data : 2023'
         },
         xAxis: {
           data: intervals
         },
         yAxis: {},
         toolbox: {
           show: true,
           feature: {
             dataView: { show: true, readOnly: false },
             magicType: { show: true, type: ['line', 'bar'] },
             restore: { show: true },
             saveAsImage: { show: true }
           }
         },
         calculable: true,
         tooltip: {
           trigger: 'axis'
         },
         series: [
           {
           type: 'bar',
           data: [
             {
               name:'0-20',
               value:counts[0],
               // 设置单个柱子的样式
               itemStyle: {
                 color: '#dd6b66',
                 borderType: 'dashed',
                 opacity: 0.7
               }
             },
             {
               name:'20-40',
               value: counts[1],
               // 设置单个柱子的样式
               itemStyle: {
                 color: '#73b9bc',
                 borderType: 'dashed',
                 opacity: 0.7
               }
             },
             {
               name:'40-60',
               value: counts[2],
               // 设置单个柱子的样式
               itemStyle: {
                 color: '#e69d87',

                 borderType: 'dashed',
                 opacity: 0.7
               }
             },

             {
               name:'60-80',
               value: counts[3],
               // 设置单个柱子的样式
               itemStyle: {
                 color: '#7289ab',
                 borderType: 'dashed',
                 opacity: 0.7
               }
             },
             {
               name:'80-100',
               value: counts[4],
               // 设置单个柱子的样式
               itemStyle: {
                 color:  '#eedd78',
                 borderType: 'dashed',
                 opacity: 0.7
               }
             },
             {
               name:'100以上',
               value: counts[5],
               // 设置单个柱子的样式
               itemStyle: {
                 color: '#91cc75',
                 borderType: 'dashed',
                 opacity: 0.7
               }
             },
           ],
             markPoint: {
               data: [
                 { type: 'max', name: 'Max' },
                 { type: 'min', name: 'Min' }
               ],
               itemStyle: {
                 color: '#7289ab',
                 borderWidth: 1
               }
             },
             markLine: {
               symbol: 'circle',
               data: [{ type: 'average', name: 'Avg' }],
               color:'#7289ab'
             }
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