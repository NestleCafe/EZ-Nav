const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')

const x = localStorage.getItem('x') //本地存储增加的站点

const xObject = JSON.parse(x)
const hashMap = xObject || [
    {logo:"G", logoType:'text',url:"https://github.com/"},
    {logo:"G", logoType:"text", url:"https://www.google.com/"},
    {logo:"B", logoType:"text", url:"https://www.bilibili.com/"},
    {logo:"Z", logoType:"text", url:"https://www.zhihu.com/"},
]

let bodyBackgroundUrl = []
let picCopyright = []
let copyrightLink = []
const media = window.matchMedia("(min-width:500px)")

let picIndex = 0
function renderButtonColor(){
    if(picIndex === 0){
        $('.previous').css("opacity","0.5")
        $('.next').css("opacity","1")
    }else if(picIndex === 6){
        $('.previous').css("opacity","1")
        $('.next').css("opacity","0.5")
    }else{
        $('.previous').css("opacity","1")
        $('.next').css("opacity","1")
    }
}

// 1直接用现成url
const getDateStr = (DayCount) =>{ 
    const date = new Date();
    date.setDate(date.getDate()+DayCount);//获取DayCount天后的日期
    const y = date.getFullYear().toString(); 
    const m = (date.getMonth()+1)<10 ? "0"+(date.getMonth()+1).toString() : (date.getMonth()+1).toString();//获取当前月份的日期，不足10补0
    const d = date.getDate()<10 ? "0"+date.getDate().toString() : date.getDate().toString();//获取当前几号，不足10补0
    return y+m+d; 
}
let dateList = []
//获取日期对应的bing背景图
$('.globalFooter .copyright').remove()
if (media.matches) {
    for(let i=0, j=0;i<7;i++,j--){
        dateList[i] = getDateStr(j)
        bodyBackgroundUrl[i] = `https://tupian.sioe.cn/b/bing-home-image/pic/${dateList[i]}.jpg`
    }
}else{
    $('body').css("background-image","url('https://api.dujin.org/bing/m.php')")
}
console.log(bodyBackgroundUrl)    

$('body').css("background-image",`url('${bodyBackgroundUrl[picIndex]}')`)
renderButtonColor()

//点击上一张图片
$('.previous').on('click',()=>{
    if(picIndex > 0){
        picIndex --
        renderButtonColor()
        $('body').css("background-image",`url('${bodyBackgroundUrl[picIndex]}')`)
    }       
})
//点击下一张图片
$('.next').on('click',()=>{
    if(picIndex < 6){
        picIndex ++
        renderButtonColor()
        $('body').css("background-image",`url('${bodyBackgroundUrl[picIndex]}')`)
    }
})    


// 2使用接口获取
/* function request(){
  return new Promise((resolve, reject)=>{
    const xhr = new XMLHttpRequest()
    xhr.open('GET', 
             'https://jsonp.afeld.me/?url=https%3A%2F%2Fcn.bing.com%2FHPImageArchive.aspx%3Fformat%3Djs%26idx%3D0%26n%3D7', true)
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4 && xhr.status ===200){
        resolve(JSON.parse(xhr.response))
      }
    }
    xhr.send()
  })
}

//调用request bing背景图
$(document).ready(()=>{
    if (media.matches) { // 媒体查询
        const BASE_URL = 'http://s.cn.bing.net'
        request().then(res=>{
            console.log('数据获取成功 ', res.images)
            for(let i = 0; i < res.images.length; i++){
                bodyBackgroundUrl[i] = BASE_URL + res.images[i].url
                picCopyright[i] = res.images[i].copyright
                copyrightLink[i] = res.images[i].copyrightlink
            }
            $('.copyright .url').attr('href',`${copyrightLink[picIndex]}`)
            $('.copyright .url .text').text(`${picCopyright[picIndex]}`)
            $(document).trigger('onRequest');
        })
    }else{
        $('.globalFooter').remove()
        $('body').css("background-image","url('https://api.dujin.org/bing/m.php')")
    }     
}) 
//监听onRequest,获取url数据，获取后渲染

$(document).bind('onRequest',() =>{
    //首次打开显示第一张图
    $('body').css("background-image",`url('${bodyBackgroundUrl[picIndex]}')`)
    renderButtonColor()
    //点击上一张图片
    $('.previous').on('click',()=>{
        if(picIndex > 0){
            picIndex --
            renderButtonColor()
            $('body').css("background-image",`url('${bodyBackgroundUrl[picIndex]}')`)
            $(document).trigger('picIndexChange')
        }       
    })
    //点击下一张图片
    $('.next').on('click',()=>{
        if(picIndex < 6){
            picIndex ++
            renderButtonColor()
            $('body').css("background-image",`url('${bodyBackgroundUrl[picIndex]}')`)
            $(document).trigger('picIndexChange')
        }
    })    
});


$(document).bind('picIndexChange',() =>{
    $('.copyright .url').attr('href',`${copyrightLink[picIndex]}`)
    $('.copyright .url .text').text(`${picCopyright[picIndex]}`)
}) */




const removePrefix = (url) =>{
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //用正则表达式 删除 / 开头的内容
}

const render = () =>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index)=>{
        const $li = $(`
        <li>
            
            <div class="site">
                <div class="logo">${removePrefix(node.url)[0].toUpperCase()}</div>
                <div class="link">${removePrefix(node.url)}</div>
                <div class="close">
                    <svg class="icon">
                        <use xlink:href="#icon-quxiao"></use>
                    </svg>
                </div>
            </div>
        
        </li>`
        ).insertBefore($lastLi)
        $li.on('click', ()=>{
            window.open(node.url)
        })
        $li.on('click', '.close', (e)=>{
            e.stopPropagation() //阻止冒泡
            hashMap.splice(index, 1)
            render()
        })
    })
}

render()
$('.addButton')
    .on('click',()=>{
        let url = window.prompt("请输入添加的网址")
        if(url.indexOf('http') !== 0){
            url = 'https://' + url
        }
        console.log(url)
        hashMap.push({
            logoType: "text",
            url: url
        })
        render()
    })
$('.close')
.on('click',()=>{
    console.log('close被点击')
    
})

/* 
$(document).on('keypress', (e)=>{
    const {key} = e
    for(let i=0; i<hashMap.length; i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url)
        }
    }
}) */ //禁用了键盘导航

$('#baidu').on('click', ()=>{
    if($('#baidu').attr('class') === 'inactive'){
        $('#baidu').attr('class','active')
        $('#google').attr('class','inactive')
        
        $('.searchForm').attr('action','https://www.baidu.com/s')
        .children('input').attr('name','wd')
        
    }
})
$('#google').on('click', ()=>{
    if($('#google').attr('class') === 'inactive'){
        $('#google').attr('class','active')
        $('#baidu').attr('class','inactive')

        $('.searchForm').attr('action','https://www.google.com/search')
        .children('input').attr('name','q')
    }
})

//localStorage
window.onbeforeunload = () =>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}