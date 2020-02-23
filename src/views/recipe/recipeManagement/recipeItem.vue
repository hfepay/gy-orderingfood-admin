<template>
  <div v-bind="$attrs" class="item" @click="onclick" v-on="$listeners">
    <div class="top">
      <div class="left">
        <div class="font-size-18">{{foodItem.foodName}}</div>
        <div class="font-size-16">{{foodItem.foodTypeCn}}</div>
      </div>
      <div class="right align-right">
        <div class="font-size-15">￥{{foodItem.price}}</div>
        <div class="font-size-16" style="color:rgba(66,185,131,1);">
          {{+foodItem.isDiscount===1?'已启用员工折扣': '未启用员工折扣'}}
        </div>
        <div class="font-size-15">{{+foodItem.status===0?'停止销售': ''}}</div>
      </div>
    </div>
    <div class="bottom">
      <el-row>
        <el-col v-if="foodItem.distributeTypes.includes('0')" :span="8" class="font-size-20">
          <img :src="breakfast" alt="">早 {{`${foodItem.mornStock}/${foodItem.mornStockCount}`}}
        </el-col>
        <el-col v-if="foodItem.distributeTypes.includes('1')" :span="8" class="font-size-20 dis-center">
          <img :src="lunch" alt="">午 {{`${foodItem.noonStock}/${foodItem.noonStockCount}`}}
        </el-col>
        <el-col v-if="foodItem.distributeTypes.includes('2')" :span="8" class="font-size-20 dis-right">
          <img :src="dinner" alt="">晚 {{`${foodItem.eveStock}/${foodItem.eveStockCount}`}}
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeItem',
  props: {
    foodItem: {
      type: Object,
      default() {
        return {
          'foodName': '一碗香',
          'foodTypeCn': '快餐',
          'price': '18.88',
          'distributeTypes': '0,1,2',
          'mornStock': '50',
          'mornStockCount': '50',
          'noonStock': '50',
          'noonStockCount': '50',
          'eveStock': '50',
          'eveStockCount': '50',
          'isDiscount': '0',
          'status': 1,
          'currentDate': '2020-02-24'
        }
      }
    }
  },
  data() {
    return {
      breakfast: require('@/assets/image/icon/breakfast.png'),
      dinner: require('@/assets/image/icon/dinner.png'),
      lunch: require('@/assets/image/icon/lunch.png')
    }
  },
  methods: {
    onclick() {
      this.$emit('onclick', this.foodItem)
    }
  }
}
</script>

<style lang="scss" scoped>
  .item {
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-wrap: wrap;
    font-family: Source Han Sans CN;
    border: 1px solid rgba(220, 223, 230, 1);
    border-radius: 4px;
    padding: 5px 15px;
    margin: 5px 0;

    .top, .bottom {
      width: 100%;
    }
  ;

    .top {
      display: flex;

      .left, .right {
        width: 50%;
      }
    }

    .font-size-18 {
      font-size: 19px;
      font-weight: bold;
      color: rgba(0, 0, 0, 1);
      line-height: 25px;
    }

    .font-size-16 {
      font-size: 16px;
      font-weight: 300;
      color: rgba(102, 102, 102, 1);
      line-height: 25px;
    }

    .font-size-15 {
      font-size: 19px;
      font-weight: 400;
      color: rgba(214, 0, 0, 1);
      line-height: 34px;
    }

    .font-size-20 {
      font-size: 16px;
      font-weight: 300;
      color: rgba(102, 102, 102, 1);
      line-height: 25px;
      display: flex;
      align-items: center;
    }

    .align-right {
      text-align: right;
    }

    .dis-center {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    .dis-right {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
  }

  .item:hover {
    box-shadow: 0 0 1px 1px rgba(220, 223, 230, 1);
    cursor: pointer;
  }
</style>
