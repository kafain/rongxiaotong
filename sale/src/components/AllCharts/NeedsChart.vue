<template>
  <div id="NeedsChart"></div>
</template>

<script>
import * as echarts from 'echarts';
import {getGoodsOrderId, getGoodsOrderPrices, getNeedsOrderId, getNeedsOrderPrices} from '@/api/order'
export default {
  name: "NeedsChart",
  data(){
    return{
      needsprice:[],
      needsid:[],
      goodsprice:[],
      goodsid:[],
    }
  },
  methods:{
    async fetchData() {
      try {
        this.needsprice = await getNeedsOrderPrices();
        this.needsid = await getNeedsOrderId();
        this.goodsprice = await getGoodsOrderPrices();
        this.goodsid = await getGoodsOrderId();
        this.initReports();
      } catch (error) {
        console.log(error);
      }
    },
    initReports() {
      var myChart = echarts.init(document.getElementById('NeedsChart'), null, {
        width: 600,
        height: 400
      });

      const option = {
        title: {
          text: 'Needs and Goods price distribution',
          subtext: 'Data : 2023'
        },
        legend: {
          data: ['Needs', 'Goods'],
          left: 'center',
          bottom: 10
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['scatter'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        tooltip:{
          axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
              type: 'dashed',
              width: 1
            }
          }
        },
        grid: {
          left: '3%',
          right: '7%',
          bottom: '7%',
          containLabel: true
        },
        xAxis: { gridIndex: 0, min: 65, max: 125 },
        yAxis: {},
        series: [
          {
            name:'Needs',
            symbolSize: 20,
            data: [
              [this.needsid[0], this.needsprice[0]],
              [this.needsid[1], this.needsprice[1]],
              [this.needsid[2], this.needsprice[2]],
              [this.needsid[3], this.needsprice[3]],
              [this.needsid[4], this.needsprice[4]],
              [this.needsid[5], this.needsprice[5]],
              [this.needsid[6], this.needsprice[6]],
              [this.needsid[7], this.needsprice[7]],
              [this.needsid[8], this.needsprice[8]],
              [this.needsid[9], this.needsprice[9]],
              [this.needsid[10], this.needsprice[10]],
              [this.needsid[11], this.needsprice[11]],
              [this.needsid[12], this.needsprice[12]],
              [this.needsid[13], this.needsprice[13]],
              [this.needsid[14], this.needsprice[14]],
              [this.needsid[15], this.needsprice[15]],
              [this.needsid[16], this.needsprice[16]],
            ],
            type: 'scatter',
            itemStyle: {
              borderColor: '#555',
              color:'#91cc75'
            },
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ],
              itemStyle: {
                borderColor:'#555',
                borderWidth: 1
              }
            },
            markLine: {
              lineStyle: {
                type: 'solid'
              },
              data: [{ type: 'average', name: 'AVG' }, { xAxis: 100 }]
            }
          },
          {
            name:'Goods',
            symbolSize: 20,
            data: [
              [this.goodsid[0], this.goodsprice[0]],
              [this.goodsid[1], this.goodsprice[1]],
              [this.goodsid[2], this.goodsprice[2]],
              [this.goodsid[3], this.goodsprice[3]],
              [this.goodsid[4], this.goodsprice[4]],
              [this.goodsid[5], this.goodsprice[5]],
              [this.goodsid[6], this.goodsprice[6]],
              [this.goodsid[7], this.goodsprice[7]],
              [this.goodsid[8], this.goodsprice[8]],
              [this.goodsid[9], this.goodsprice[9]],
              [this.goodsid[10], this.goodsprice[10]],
              [this.goodsid[11], this.goodsprice[11]],
              [this.goodsid[12], this.goodsprice[12]],
              [this.goodsid[13], this.goodsprice[13]],
              [this.goodsid[14], this.goodsprice[14]],
              [this.goodsid[15], this.goodsprice[15]],
              [this.goodsid[16], this.goodsprice[16]],
              [this.goodsid[17], this.goodsprice[17]],
              [this.goodsid[18], this.goodsprice[18]],
              [this.goodsid[19], this.goodsprice[19]],
              [this.goodsid[20], this.goodsprice[20]],
              [this.goodsid[21], this.goodsprice[21]],
              [this.goodsid[22], this.goodsprice[22]],
              [this.goodsid[23], this.goodsprice[23]],
              [this.goodsid[24], this.goodsprice[24]],
              [this.goodsid[25], this.goodsprice[25]],
              [this.goodsid[26], this.goodsprice[26]],
              [this.goodsid[27], this.goodsprice[27]],
              [this.goodsid[28], this.goodsprice[28]],
            ],
            type: 'scatter',
            itemStyle: {
              borderColor: '#555',
              color:'#73b9bc'
            },
            markPoint: {
              data: [
                { type: 'max', name: 'Max' },
                { type: 'min', name: 'Min' }
              ],
              itemStyle: {
                borderColor:'#555',
                borderWidth: 1
              }
            },
            markLine: {
              lineStyle: {
                type: 'solid',
                color:'#7289ab'
              },
              data: [{ type: 'average', name: 'AVG' }, { xAxis: 90 }]
            }
          }
        ]
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