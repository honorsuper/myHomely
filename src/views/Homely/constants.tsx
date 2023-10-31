export const colorList = [
  {
    bgColor: '#cccccc',
    color: '#000000',
  },
  {
    bgColor: '#444444',
    color: '#ffffff',
  },
  {
    bgColor: '#337ab7',
    color: '#ffffff',
  },
  {
    bgColor: '#5bc0de',
    color: '#ffffff',
  },
  {
    bgColor: '#449d44',
    color: '#ffffff',
  },
  {
    bgColor: '#f0ad4e',
    color: '#ffffff',
  },
  {
    bgColor: '#d9534f',
    color: '#ffffff',
  },
]

export const menuData = [
  {
    id: 1,
    mainTitle: '1',
    list: ['nine', 'ten', 'three'].map((item, index) => ({
      title: item,
      url: 'https://www.baidu.com/',
      id: item,
      isGroup: 1,
      groupTitle: `分组${index + 1}${item}`,
      groupList: [
        {
          subTitle: '组内1',
          subUrl: 'https://www.baidu.com/1',
          id: 1,
        },
        {
          subTitle: '组内2',
          subUrl: 'https://www.baidu.com/2',
          id: 2,
        },
        {
          subTitle: '组内3',
          subUrl: 'https://www.baidu.com/3',
          id: 3,
        },
      ],
      ...colorList[0],
    })),
  },
  {
    id: 2,
    mainTitle: '2',
    list: ['eight', 'nine', 'ten'].map((item) => ({
      title: item,
      url: 'https://www.baidu.com/',
      id: item,
      ...colorList[1],
    })),
  },
  {
    id: 3,
    mainTitle: '3',
    list: ['three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'].map((item) => ({
      title: item,
      id: item,
      url: 'https://www.baidu.com/',
      ...colorList[2],
    })),
  },
  {
    id: 4,
    mainTitle: '4',
    list: ['four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'].map((item) => ({
      title: item,
      url: 'https://www.baidu.com/',
      ...colorList[3],
    })),
  },
  {
    id: 5,
    mainTitle: '5',
    list: ['seven', 'eight', 'nine', 'ten'].map((item) => ({
      title: item,
      id: item,
      url: 'https://www.baidu.com/',
      ...colorList[4],
    })),
  },
  {
    id: 6,
    mainTitle: '6',
    list: ['six', 'seven', 'eight', 'nine', 'ten'].map((item) => ({
      title: item,
      id: item,
      url: 'https://www.baidu.com/',
      ...colorList[5],
    })),
  },
  {
    id: 7,
    mainTitle: '7',
    list: ['six', 'seven', 'eight', 'nine', 'ten'].map((item) => ({
      title: item,
      id: item,
      url: 'https://www.baidu.com/',
      ...colorList[6],
    })),
  },
  {
    id: 8,
    mainTitle: '8',
    list: ['six', 'seven', 'eight', 'nine', 'ten'].map((item) => ({
      title: item,
      id: item,
      url: 'https://www.baidu.com/',
      ...colorList[1],
    })),
  },
  {
    id: 9,
    mainTitle: '9',
    list: ['nine'].map((item) => ({
      title: item,
      id: item,
      url: 'https://www.baidu.com/',
      ...colorList[2],
    })),
  },
  {
    id: 10,
    mainTitle: '10',
    list: ['six', 'seven', 'eight', 'nine', 'ten'].map((item) => ({
      title: item,
      id: item,
      url: 'https://www.baidu.com/',
      ...colorList[3],
    })),
  },
  {
    id: 11,
    mainTitle: '11',
    list: ['five', 'six', 'seven', 'eight', 'nine', 'ten'].map((item) => ({
      title: item,
      id: item,
      url: 'https://www.baidu.com/',
      ...colorList[4],
    })),
  },
  {
    id: 12,
    mainTitle: '12',
    list: ['four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'].map((item) => ({
      title: item,
      id: item,
      url: 'https://www.baidu.com/',
      ...colorList[5],
    })),
  },
  {
    id: 13,
    mainTitle: '13',
    list: ['seven', 'eight', 'nine', 'ten'].map((item) => ({
      title: item,
      id: item,
      url: 'https://www.baidu.com/',
      ...colorList[6],
    })),
  },
]
