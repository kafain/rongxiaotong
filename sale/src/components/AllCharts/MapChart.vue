<template>
  <div id="mapContainer"></div>
</template>

<script>
import * as echarts from 'echarts';
import mapJson from "./assets/china.json";
import {getOrderAddress} from "@/api/order";

export default {
  name: "MapChart",
  data() {
    return {
      mapData: mapJson,
      address:[]
    }
  },
  methods:{
    async fetchData() {
      try {
        this.address = await getOrderAddress();
        this.initReports();
      } catch (error) {
        console.log(error);
      }
    },
    initReports(){
      // 假设 address 是从后端获取的地址数组
      var provinceCount = {};
      var maxCount = 0;

      for (var i = 0; i < this.address.length; i++) {
        var province = this.address[i];

        if (provinceCount[province]) {
          provinceCount[province]++;
        } else {
          provinceCount[province] = 1;
        }
        if (provinceCount[province] > maxCount) {
          maxCount = provinceCount[province];
        }
      }
      // 注册地图数据
      echarts.registerMap('china', this.mapData);

      // 创建 ECharts 实例
      var myChart = echarts.init(document.getElementById('mapContainer'),null,{
        width:700,
        height:800
      });

      // 配置地图选项
      var option = {
        title:{
          text: 'Regional distribution of orders',
          subtext: 'Data : 2023'
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.name + ': ' + provinceCount[params.name];
          },
          show:false
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '省份出现次数',
            type: 'map',
            map: 'china',
            size: ['100%', '100%'],
            data: Object.entries(provinceCount).map(function ([name, value]) {
              return { name, value };
            }),
            label: {
              color:'#555',
              show: true,
              formatter: function (params) {
                return params.name;
              },
            },
            emphasis: {
              label: {
                show: true,
                formatter: function (params) {
                  return params.name + ': ' + provinceCount[params.name];
                },
              },
              itemStyle: {
                areaColor:'#eedd78',
              },
            },
            roam:false,
            itemStyle: {
              areaColor:'#96BFFF',
              opacity: 0.7,
              borderColor: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color:'#9d96f5'
                    },
                    {
                      offset: 1,
                      color: '#555'
                    }
                  ],
                  false
              ),
            },
          },
        ],
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