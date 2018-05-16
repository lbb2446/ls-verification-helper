// 各种表单校验，直接取出配合自带方法校验
export default {
  pattern: { // 正则类
    mobile: function () {
      return {
        pattern: /^1[345789]\d{9}$/,
        message: '手机号格式错误'
      }
    },
    fixedLine: () => {
      return {
        pattern: /^([0-9]{3,4}-)?[0-9]{7,8}$/,
        message: '固定电话格式错误'
      }
    },
    email: () => {
      return {
        trigger: 'blur',
        pattern: /^[a-zA-Z\d]+([-_.][a-zA-Z\d]+)*@[a-zA-Z\d]+\.[a-zA-Z\d]{2,4}$/,
        message: '邮箱格式错误'
      }
    },
    postcode: () => {
      return {
        pattern: /^[1-9]\d{5}$/,
        message: '邮编格式错误'
      }
    },
    fax: () => {
      return {
        pattern: /^(\d{3,4}-)?\d{7,8}$/,
        message: '传真格式错误'
      }
    },
    specialRule: () => {
      return {
        pattern: /(^[A-Za-z0-9_]+$)/,
        message: '内容只能包含字母数字下划线'
      }
    },
    noNumAndSpecial: () => {
      return {
        pattern: new RegExp('((?=[x21-x7e]+)[^A-Za-z0-9])'),
        message: '内容不能含有数字和特殊字符'
      }
    },
    noChinese: () => {
      return {
        pattern: /[\u4E00-\u9FA5]/,
        message: '内容不能为中文'
      }
    }
  },
  validator: { // 验证方法类
    idNumber: () => { // 身份证校验
      return {
        trigger: 'blur',
        validator (rule, value, callback) {
          let error = '身份证格式不正确'
          let re = /^\d{17}(\d|X|x)$/
          let idNum = value.toUpperCase() || ''
          if (re.test(idNum)) {
            let weight = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 十七位数字本体码权重
            let validate = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] // mod11,对应校验码字符值
            let sum = 0
            let mode = 0
            let id17 = idNum.substring(0, 17)
            for (let i = 0; i < 17; i++) {
              sum = sum + parseInt(id17.substring(i, i + 1) * weight[i])
            }
            mode = sum % 11

            if (idNum[17] === validate[mode]) {
              callback()
            } else {
              callback(new Error(error))
            }
          } else {
            callback(new Error(error))
          }
        }
      }
    },
    asyncValidate: ({ // 异步校验字段
      sendField = '',
      params = {
        url: '',
        method: 'post',
        data: {}
      },
      message = '',
      isRight
    } = {},
    // vue传参使用
    vm) => {
      return {
        trigger: 'blur',
        validator (rule, value, callback) {
          params.data[sendField] = value
          vm.$ajax(params).then(function (data) {
            if (isRight(data)) {
              callback()
            } else {
              callback(new Error(message || '该字段已存在'))
            }
          }, function (error) {
            callback(new Error(error))
          })
        }
      }
    }
  },
  otherValidate: { // 其余通用验证
    length: ({min = 0, max = 99999}) => { // 长度校验
      return {
        trigger: 'blur',
        min: min,
        max: max,
        message: `长度在${min}到${max}之间`
      }
    }
  }
}
