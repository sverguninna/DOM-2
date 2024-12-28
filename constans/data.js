 let data = {
   userComments: [{
        userName: 'Глеб Фокин',
        userComment: ' Это будет первый комментарий на этой странице',
        userNumLike: 3  ,
        date: '12.02.22 ', 
        time: '12:18',
        id: 0,
        like: false,
    },
    {
        userName: 'Nika',
        userComment: 'hello',
        userNumLike:0,
        date: '21:7:2024', 
        time: '11:30',
        id : 1,
        like: false,
    }],
    setUserComments: function (newValue) {
        this.userComments = newValue
    }
 };

export {data}